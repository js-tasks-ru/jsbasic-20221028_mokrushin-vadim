import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  deleteProducts() {
    this.cartItems = [];
    this.cartIcon.update(this);
  }

  addProduct(product) {
    if (!product) return;

    const similarProduct = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (similarProduct) {
      similarProduct.count++;
      this.onProductUpdate(similarProduct);
    } else {
      const newItem = { product, count: 1 };
      this.cartItems.push(newItem);
      this.onProductUpdate(newItem);
    }
  }

  updateProductCount(productId, amount) {
    const similarProductIndex = this.cartItems.findIndex(
      (item) => item.product.id === productId
    );

    if (similarProductIndex >= 0) {
      const item = this.cartItems[similarProductIndex];
      item.count += amount;
      item.count === 0 && this.cartItems.splice(similarProductIndex, 1);
      this.onProductUpdate(item);
    }
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, val) => sum + val.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.count,
      0
    );
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");

    const div = document.createElement("DIV");
    this.cartItems.forEach((item) =>
      div.appendChild(this.renderProduct(item.product, item.count))
    );
    div.appendChild(this.renderOrderForm());

    this.modal.setBody(div);
    this.modal.open();

    this.modal.elem.addEventListener("click", (event) => {
      if (event.target.closest(".cart-counter__button")) {
        const productId =
          event.target.closest(".cart-product").dataset.productId;

        if (event.target.closest(".cart-counter__button_plus")) {
          this.updateProductCount(productId, 1);
        }

        if (event.target.closest(".cart-counter__button_minus")) {
          this.updateProductCount(productId, -1);
        }
      }
    });

    const form = this.modal.elem.querySelector(".cart-form");
    form.addEventListener("submit", this.onSubmit.bind(this));
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains("is-modal-open")) {
      if (this.isEmpty()) {
        this.modal.close();
      } else {
        const productId = cartItem.product.id;
        const modalBody = document.querySelector(".modal__body");

        const productCount = modalBody.querySelector(
          `[data-product-id="${productId}"] .cart-counter__count`
        );
        productCount.textContent = `${cartItem.count}`;

        const productPrice = modalBody.querySelector(
          `[data-product-id="${productId}"] .cart-product__price`
        );
        productPrice.textContent = `€${(
          cartItem.count * cartItem.product.price
        ).toFixed(2)}`;
        const infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
        infoPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;
      }
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const button = event.target.querySelector('[type="submit"]');
    button.classList.add("is-loading");

    fetch("https://httpbin.org/post", { method: "POST", body: formData })
      .then((response) => {
        return response.json;
      })
      .then((text) => {
        this.deleteProducts();
        this.modal.setTitle("Success!");
        this.modal.setBody(
          createElement(`<div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
      `)
        );
      });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
