import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);

    this.addEventListeners();
  }

  addEventListeners() {
    document.body.addEventListener("product-add", (event) => {
      const product = this.products.find(
        (product) => product.id === event.detail
      );
      this.cart.addProduct(product);
    });

    document.body.addEventListener("slider-change", (event) => {
      this.productsGrid.updateFilter({ maxSpiciness: event.detail });
    });

    document.body.addEventListener("ribbon-select", (event) => {
      this.productsGrid.updateFilter({ category: event.detail });
    });

    document
      .querySelector(`input#nuts-checkbox`)
      .addEventListener("change", (event) => {
        this.productsGrid.updateFilter({ noNuts: event.target.checked });
      });

    document
      .querySelector(`input#vegeterian-checkbox`)
      .addEventListener("change", (event) => {
        this.productsGrid.updateFilter({
          vegeterianOnly: event.target.checked,
        });
      });
  }

  async render() {
    document
      .querySelector("[data-carousel-holder]")
      .appendChild(this.carousel.elem);

    document
      .querySelector("[data-ribbon-holder]")
      .appendChild(this.ribbonMenu.elem);

    document
      .querySelector("[data-slider-holder]")
      .appendChild(this.stepSlider.elem);

    document
      .querySelector("[data-cart-icon-holder]")
      .appendChild(this.cartIcon.elem);

    this.products = await fetch("products.json").then((response) =>
      response.json()
    );

    this.productsGrid = new ProductsGrid(this.products);
    document
      .querySelector("[data-products-grid-holder")
      .replaceChildren(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value,
    });
  }
}
