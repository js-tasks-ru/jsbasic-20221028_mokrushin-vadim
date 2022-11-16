function highlight(table) {
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    const age = row.cells[1];
    const gender = row.cells[2];
    const status = row.cells[3];

    if (+age.textContent < 18) {
      row.style = "text-decoration: line-through";
    }

    if (gender.textContent === "m") row.classList.add("male");
    else if (gender.textContent === "f") row.classList.add("female");

    if (!status.hasAttribute("data-available")) {
      row.hidden = true;
      continue;
    }

    if (status.dataset.available === "true") row.classList.add("available");
    else if (status.dataset.available === "false")
      row.classList.add("unavailable");
  }
}
