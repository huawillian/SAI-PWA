const createItemEl = item => {
  let el = document.createElement("a");
  el.href = `/detail?id=${item.id}`;
  el.classList.add("item");

  let iconEl = document.createElement("i");
  iconEl.classList.add("material-icons");
  iconEl.innerText = item.icon;

  let titleEl = document.createElement("div");
  titleEl.innerText = item.title;

  el.append(iconEl);
  el.append(titleEl);

  return el;
};

let itemContainerEl;

window.addEventListener("load", () => {
  itemContainerEl = document.querySelector(".item-container");

  window.getItems().then(items => {
    items.forEach(item => {
      let el = createItemEl(item);
      itemContainerEl.append(el);
    });
  });
});
