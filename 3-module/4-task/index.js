function showSalary(users, age) {
  return users
    .filter((item) => item.age <= age)
    .reduce((sum, item, index, arr) => {
      return (
        sum +
        `${item.name}, ${item.balance}${index < arr.length - 1 ? "\n" : ""}`
      );
    }, "");
}
