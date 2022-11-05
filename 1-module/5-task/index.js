function truncate(str, maxlength) {
  if (str.length > maxlength) {
    return str.substr(0, maxlength - 1).concat("…");
  } else {
    return str;
  }
}

console.log(truncate("Вот, что мне хотелось бы сказать на эту тему:", 20));
