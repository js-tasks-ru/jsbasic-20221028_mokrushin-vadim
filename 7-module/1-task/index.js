import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  activeCategory = null;

  constructor(categories) {
    const ribbon = createElement('<div class="ribbon"></div>');

    ribbon.appendChild(
      createElement(`<button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`)
    );

    const ribonInner = createElement(`<nav class="ribbon__inner"></nav>`);
    categories.forEach((element, index) => {
      ribonInner.appendChild(
        createElement(
          `<a href="#" class="ribbon__item${
            index === 0 ? ` ribbon__item_active` : ""
          }" data-id="${element.id}">${element.name}</a>`
        )
      );
    });

    ribbon.appendChild(ribonInner);
    ribonInner.addEventListener("scroll", function () {
      const left = document.querySelector(".ribbon__arrow_left");
      const right = document.querySelector(".ribbon__arrow_right");

      if (this.scrollLeft < 1) {
        left.classList.remove("ribbon__arrow_visible");
        right.classList.add("ribbon__arrow_visible");
        return;
      }

      if (this.scrollWidth - this.scrollLeft - this.clientWidth < 1) {
        right.classList.remove("ribbon__arrow_visible");
        left.classList.add("ribbon__arrow_visible");
        return;
      }

      left.classList.add("ribbon__arrow_visible");
      right.classList.add("ribbon__arrow_visible");
      return;
    });

    ribbon.appendChild(
      createElement(` <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`)
    );

    this.elem = ribbon;
    this.activeCategory = this.elem.querySelector(".ribbon__item_active");
    this.addRootEventListeners();
  }

  addRootEventListeners() {
    this.elem.addEventListener(
      "click",
      ((event) => {
        event.preventDefault();
        const target = event.target;

        if (target.classList.contains("ribbon__item")) {
          this.activeCategory?.classList.remove("ribbon__item_active");
          this.activeCategory = target;
          target.classList.add("ribbon__item_active");

          event.currentTarget.dispatchEvent(
            new CustomEvent("ribbon-select", {
              bubbles: true,
              detail: target.dataset.id,
            })
          );
        }
      }).bind(this)
    );

    this.elem.addEventListener(
      "click",
      ((event) => {
        const target = event.target;

        if (target.closest(".ribbon__arrow")) {
          if (target.closest(".ribbon__arrow_left")) {
            document.querySelector(".ribbon__inner").scrollBy(-350, 0);
          }

          if (target.closest(".ribbon__arrow_right")) {
            document.querySelector(".ribbon__inner").scrollBy(350, 0);
          }
        }
      }).bind(this)
    );
  }
}
