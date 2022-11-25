function initCarousel() {
  const carousel = document.querySelector(".carousel");

  carousel.addEventListener("click", (event) => {
    event.target.closest(".carousel__arrow_left") && view.switchLeft();
    event.target.closest(".carousel__arrow_right") && view.switchRight();
  });

  const view = {
    position: 0,
    inner: document.querySelector(".carousel__inner"),
    length: document.querySelector(".carousel__inner").children.length,
    arrowLeft: document.querySelector(".carousel__arrow_left"),
    arrowRight: document.querySelector(".carousel__arrow_right"),

    switchLeft() {
      this.position--;
      this.update();
    },

    switchRight() {
      this.position++;
      this.update();
    },

    update() {
      this.inner.style.transform = `translateX(-${
        this.position * this.inner.offsetWidth
      }px)`;

      if (this.position > 0 && this.position < this.length) {
        this.arrowLeft.style.display = "block";
        this.arrowRight.style.display = "block";
      }
      if (this.position === 0) this.arrowLeft.style.display = "none";
      if (this.position === this.length - 1)
        this.arrowRight.style.display = "none";
    },
  };
  view.update();
}
