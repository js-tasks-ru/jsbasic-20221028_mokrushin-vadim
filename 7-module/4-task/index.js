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

  updateDynamicView(x) {
    this.sliderValue.textContent = this.value;
    this.sliderProgress.style.width =
      ((x - this.elem.getBoundingClientRect().left) /
        this.elem.getBoundingClientRect().width) *
        100 +
      "%";
    const selectedSpan = this.elem.querySelector(".slider__step-active");
    selectedSpan?.classList.remove("slider__step-active");
    this.sliderSteps.children[this.value].classList.add("slider__step-active");
  }

  dispatchChangeEvent() {
    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  }

  setValue(x) {
    const clickPoint = x - this.elem.getBoundingClientRect().left;
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
    this.sliderThumb.addEventListener("pointerdown", (event) => {
      const moveAt = (pageX) => {
        thumb.style.left = pageX + "px";
        thumb.style.top = initialY + thumb.offsetHeight / 2 + "px";
      };

      const onMove = (event) => {
        moveAt(event.pageX);
        this.setValue(event.pageX);
        this.updateDynamicView(event.pageX);
      };

      const thumb = this.sliderThumb;
      const initialY = thumb.getBoundingClientRect().top;
      const shiftX = event.clientX - thumb.getBoundingClientRect().left;
      const shiftY = event.clientY - thumb.getBoundingClientRect().top;

      thumb.ondragstart = () => false;
      thumb.style.position = "absoulute";
      document.body.append(thumb);
      this.elem.classList.add("slider_dragging");
      moveAt(event.pageX);

      document.addEventListener("mousemove", onMove);
      thumb.onmouseup = () => {
        document.removeEventListener("mousemove", onMove);
        document.body.removeChild(thumb);
        this.elem.classList.remove("slider_dragging");
        thumb.style.top = "50%";
        this.elem.appendChild(thumb);
        this.updateView();
        thumb.onmouseup = null;

        this.dispatchChangeEvent();
      };
    });

    this.elem.addEventListener("click", (event) => {
      this.setValue(event.clientX);
      this.updateView();
      this.dispatchChangeEvent();
    });
  }
}
