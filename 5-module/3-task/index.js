function initCarousel() {
  const carousel = document.querySelector(".carousel");
  const arrowLeft = document.querySelector(".carousel__arrow_left");
  const arrowRight = document.querySelector(".carousel__arrow_right");
  const inner = document.querySelector(".carousel__inner");

  const view = {
    position: 0,
    // inner: document.querySelector(".carousel__inner");
    length: inner.children.length,

    switchLeft() {
      this.position--;
      this.update();
    },

    switchRight() {
      this.position++;
      this.update();
    },

    update() {
      inner.style.transform = `translateX(-${
        this.position * inner.offsetWidth
      }px)`;

      if (this.position > 0 && this.position < this.length) {
        arrowLeft.style.display = "block";
        arrowRight.style.display = "block";
      }
      if (this.position === 0) arrowLeft.style.display = "none";
      if (this.position === this.length - 1) arrowRight.style.display = "none";
    },
  };

  view.update();

  carousel.addEventListener("click", (event) => {
    event.target.closest(".carousel__arrow_left") && view.switchLeft();
    event.target.closest(".carousel__arrow_right") && view.switchRight();
  });
}
