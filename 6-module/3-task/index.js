import createElement from "../../assets/lib/create-element.js";

class Slide {
  constructor(product) {
    this.product = product;

    const slide = document.createElement("DIV");
    const basePath = "/assets/images/carousel/";
    slide.classList.add("carousel__slide");

    slide.innerHTML = `
    <div class="carousel__slide" data-id="${product.id}">
    <img src="${basePath}${product.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${product.price.toFixed(2)}</span>
        <div class="carousel__title">${product.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
    `;

    this.elem = slide;
  }
}

export default class Carousel {
  constructor(slides) {
    const carousel = createElement(`
    <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
    </div>`);

    const inner = createElement(`<div class="carousel__inner"></div>`);
    slides.forEach((element) => {
      inner.appendChild(new Slide(element).elem);
    });

    carousel.appendChild(inner);
    this.elem = carousel;

    this.addEventListener();

    document.addEventListener("product-add", (event) => {
      console.log(event.detail);
    });
  }

  addEventListener() {
    this.elem.addEventListener("click", (event) => {
      event.target.closest(".carousel__arrow_left") && this.switchLeft();
      event.target.closest(".carousel__arrow_right") && this.switchRight();
    });

    this.elem.addEventListener("click", (event) => {
      if (event.target.closest(".carousel__button")) {
        event.currentTarget.dispatchEvent(
          new CustomEvent("product-add", {
            bubbles: true,
            detail: event.target.closest(".carousel__slide").dataset.id,
          })
        );
      }
    });
  }

  init() {
    this.position = 0;
    this.innerBox = document.querySelector(".carousel__inner");
    this.arrowLeft = document.querySelector(".carousel__arrow_left");
    this.arrowRight = document.querySelector(".carousel__arrow_right");

    this.update();
  }

  get carouselLength() {
    return this.innerBox.children.length;
  }

  switchLeft() {
    this.position--;
    this.update();
  }

  switchRight() {
    this.position++;
    this.update();
  }

  update() {
    this.innerBox.style.transform = `translateX(-${
      this.position * this.innerBox.offsetWidth
    }px)`;

    if (this.position > 0 && this.position < this.carouselLength - 1) {
      this.arrowLeft.style.display = "block";
      this.arrowRight.style.display = "block";
      return;
    }
    if (this.position === 0) {
      this.arrowLeft.style.display = "none";
      return;
    }
    if (this.position === this.carouselLength - 1)
      this.arrowRight.style.display = "none";
  }
}
