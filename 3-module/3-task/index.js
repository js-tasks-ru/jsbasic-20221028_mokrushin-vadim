function camelize(str) {
  return str
    .split("-")
    .map((item, index) => {
      if (!item) return;
      if (!index && str[0] != "-") return item;
      return item[0].toUpperCase() + item.slice(1);
    })
    .join("");
}
