import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.elem = createElement(`
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title">Title</h3>
        </div>
        <div class="modal__body"></div>
    </div>
    `);

    this.addEventListeners();
  }

  addEventListeners() {
    this.elem.addEventListener("click", (event) => {
      event.target.closest(".modal__close") && this.close();
    });

    this.onescape = (event) => {
      event.key === "Escape" && this.close();
    };
    document.addEventListener("keydown", this.onescape);
  }

  setTitle(title) {
    this.elem.querySelector(".modal__title").textContent = title;
  }

  setBody(body) {
    this.elem.querySelector(".modal__body").replaceChildren(body);
  }

  open() {
    document.body.appendChild(this.elem);
    document.body.classList.add("is-modal-open");
  }

  close() {
    document.removeEventListener("keydown", this.onescape);
    document.querySelector(".modal") && document.body.removeChild(this.elem);
    document.body.classList.remove("is-modal-open");
  }
}
