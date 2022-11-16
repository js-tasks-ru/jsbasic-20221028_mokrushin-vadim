function makeFriendsList(friends) {
  return friends.reduce((sum, item) => {
    const li = document.createElement("LI");
    li.textContent = `${item.firstName} ${item.lastName}`;
    sum.append(li);
    return sum;
  }, document.createElement("UL"));
}
