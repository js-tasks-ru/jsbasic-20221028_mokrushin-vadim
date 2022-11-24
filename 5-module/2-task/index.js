function toggleText() {
  const button = document.querySelector(".toggle-text-button");
  const div = document.querySelector("#text");
  button.addEventListener("click", () => {
    div.hidden = !div.hidden;
  });
}
