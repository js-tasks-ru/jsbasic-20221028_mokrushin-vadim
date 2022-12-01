export default class UserTable {
  constructor(rows) {
    const table = document.createElement("TABLE");

    const tbody = document.createElement("TBODY");
    rows.forEach((item) => {
      const tr = document.createElement("TR");
      for (let key in item) {
        const td = document.createElement("TD");
        td.textContent = item[key];
        tr.appendChild(td);
      }

      const td = document.createElement("TD");
      td.innerHTML = `<button>X</button>`;
      tr.appendChild(td);

      tbody.appendChild(tr);
    });

    table.innerHTML = `<thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    </thead>`;
    table.appendChild(tbody);

    table.addEventListener("click", this.#onClick);

    this.elem = table;
  }

  #onClick(event) {
    if (event.target.tagName === "BUTTON") {
      event.target.closest("TBODY").removeChild(event.target.closest("TR"));
    }
  }
}
