function initCarousel() {
  const carousel = document.querySelector(".carousel");

  carousel.addEventListener("click", (event) => {
    event.target.closest(".carousel__arrow_left") && view.switchLeft();
    event.target.closest(".carousel__arrow_right") && view.switchRight();
  });

  const view = {
    position: 0,
    innerBox: document.querySelector(".carousel__inner"),
    arrowLeft: document.querySelector(".carousel__arrow_left"),
    arrowRight: document.querySelector(".carousel__arrow_right"),

    get carouselLength() {
      return this.innerBox.children.length;
    },

    switchLeft() {
      this.position--;
      this.update();
    },

    switchRight() {
      this.position++;
      this.update();
    },

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
    },
  };
  view.update();
}
