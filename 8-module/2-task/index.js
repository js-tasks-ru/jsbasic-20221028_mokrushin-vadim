import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.elem = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner"></div>
    </div>`);

    this.inner = this.elem.querySelector(".products-grid__inner");
    this.products = products;
    this.filters = {};
    this.#updateView();
  }

  #updateView() {
    let filteredProducts = this.products;

    if (Object.entries(this.filters).length !== 0) {
      Object.entries(this.filters).forEach(([key, val]) => {
        if (key === "maxSpiciness") {
          filteredProducts = filteredProducts.filter(
            (item) => item["spiciness"] <= val
          );
        }
        if (key === "vegeterianOnly" && val === true) {
          filteredProducts = filteredProducts.filter(
            (item) => item["vegeterian"] === val
          );
        }
        if (key === "noNuts" && val === true) {
          filteredProducts = filteredProducts.filter(
            (item) => item["nuts"] !== val
          );
        }
        if (key === "category" && val) {
          filteredProducts = filteredProducts.filter(
            (item) => item[key] === val
          );
        }
      });
    }
    this.inner.replaceChildren(
      ...filteredProducts.map((item) => new ProductCard(item).elem)
    );
  }

  updateFilter(filters) {
    this.filters = Object.assign(this.filters, filters);
    this.#updateView();
  }
}
