let db;
const itemContainerEl = document.querySelector(".item-container");

// Render item list on load
window.addEventListener('load', () => {
  db = new SaiDB();
  db.init().then(() => {
    db.getItems().then(items => {
      items.forEach(item => {
        const el = createItemEl(item);
        itemContainerEl.append(el);
      });
    });
  });
});

// Create Item Element given Item
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