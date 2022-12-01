export default class ProductCard {
  constructor(product) {
    this.product = product;

    const card = document.createElement("DIV");
    const basePath = "/assets/images/products/";
    card.classList.add("card");

    const topElement = `
    <div class="card__top">
      <img src="${basePath}${product.image}" class="card__image" alt="product">
      <span class="card__price">€${product.price.toFixed(2)}</span>
    </div>`;

    const bodyElement = `
    <div class="card__body">
      <div class="card__title">${product.name}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
    </div>`;

    card.innerHTML = topElement + bodyElement;
    card.addEventListener("click", this.#onclick.bind(this));

    this.elem = card;
  }

  #onclick(event) {
    if (event.target.closest(".card__button")) {
      event.currentTarget.dispatchEvent(
        new CustomEvent("product-add", {
          bubbles: true,
          detail: this.product.id,
        })
      );
    }
  }
}
