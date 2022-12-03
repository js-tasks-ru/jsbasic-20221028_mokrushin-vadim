import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = createElement(`
    <div class="slider">
      <div class="slider__thumb">
        <span class="slider__value"></span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps"></div>
    </div>
    `);

    const slider = this.elem.querySelector(".slider__steps");
    for (let i = 0; i < steps; i++) {
      slider.innerHTML += `<span></span>`;
    }

    this.initVariables();
    this.initEventListeners();
    this.updateView();
  }

  initVariables() {
    this.sliderThumb = this.elem.querySelector(".slider__thumb");
    this.sliderProgress = this.elem.querySelector(".slider__progress");
    this.sliderValue = this.elem.querySelector(".slider__value");
    this.sliderSteps = this.elem.querySelector(".slider__steps");
  }

  updateView() {
    const relativeValue = (this.value / (this.steps - 1)) * 100 + "%";
    this.sliderThumb.style.left = relativeValue;
    this.sliderProgress.style.width = relativeValue;
    this.sliderValue.textContent = this.value;

    const selectedSpan = this.elem.querySelector(".slider__step-active");
    selectedSpan?.classList.remove("slider__step-active");

    this.sliderSteps.children[this.value].classList.add("slider__step-active");
  }

  initEventListeners() {
    this.elem.addEventListener("click", (event) => {
      const clickPoint = event.clientX - this.elem.getBoundingClientRect().left;
      const scaleWidth = this.elem.getBoundingClientRect().width;
      const relativeScaleClickPoint = clickPoint / scaleWidth;
      const selectedValue = Math.round(
        relativeScaleClickPoint * (this.steps - 1)
      );

      this.value = selectedValue;
      this.updateView();

      this.elem.dispatchEvent(
        new CustomEvent("slider-change", {
          detail: this.value,
          bubbles: true,
        })
      );
    });
  }
}
