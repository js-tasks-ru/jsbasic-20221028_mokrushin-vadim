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
    this.thumb = this.elem.querySelector(".slider__thumb");
    this.progressBar = this.elem.querySelector(".slider__progress");
    this.valueField = this.elem.querySelector(".slider__value");
    this.stepsBar = this.elem.querySelector(".slider__steps");
  }

  updateView() {
    const relativeValue = (this.value / (this.steps - 1)) * 100 + "%";
    this.thumb.style.left = relativeValue;
    this.progressBar.style.width = relativeValue;
    this.valueField.textContent = this.value;
    this.updateActiveSpan();
    // console.log(this.progressBar.style.width);
  }

  updateDynamicView(x) {
    this.valueField.textContent = this.value;
    this.progressBar.style.width =
      ((x - this.elem.getBoundingClientRect().left) /
        this.elem.getBoundingClientRect().width) *
        100 +
      "%";
    this.updateActiveSpan();
    console.log(this.progressBar.style.width);
  }

  updateActiveSpan() {
    const selectedSpan = this.elem.querySelector(".slider__step-active");
    selectedSpan?.classList.remove("slider__step-active");
    this.stepsBar.children[this.value].classList.add("slider__step-active");
  }

  dispatchChangeEvent() {
    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  }

  setValue(pageX) {
    const clickPoint = pageX - this.elem.getBoundingClientRect().left;
    const scaleWidth = this.elem.getBoundingClientRect().width;
    const relativeScaleClickPoint = clickPoint / scaleWidth;
    const selectedValue = Math.round(
      relativeScaleClickPoint * (this.steps - 1)
    );

    if (selectedValue < 0) {
      this.value = 0;
      return;
    }
    if (selectedValue > this.steps - 1) {
      this.value = this.steps - 1;
      return;
    }

    this.value = selectedValue;
  }

  initEventListeners() {
    this.thumb.addEventListener("pointerdown", (event) => {
      const moveAt = (pageX) => {
        thumb.style.left = pageX - sliderShiftX + "px";
        thumb.style.top = "50%";
      };

      const onMove = (event) => {
        moveAt(event.pageX);
        this.setValue(event.pageX);
        this.updateDynamicView(event.pageX);
      };

      const thumb = this.thumb;
      const sliderShiftX = this.elem.getBoundingClientRect().left;
      // const shiftX = event.clientX - thumb.getBoundingClientRect().left;
      // const shiftY = event.clientY - thumb.getBoundingClientRect().top;

      thumb.ondragstart = () => false;
      this.elem.classList.add("slider_dragging");
      moveAt(event.pageX);

      this.elem.addEventListener("pointermove", onMove);

      const pointerup = () => {
        this.dispatchChangeEvent();
        this.updateView();
        thumb.removeEventListener("pointerup", pointerup);
        this.elem.removeEventListener("pointermove", onMove);
        this.elem.classList.remove("slider_dragging");
      };

      thumb.addEventListener("pointerup", pointerup);
    });

    this.elem.addEventListener("click", (event) => {
      this.setValue(event.clientX);
      this.updateView();
      this.dispatchChangeEvent();
    });
  }
}
