let db;
let iconContainer = document.querySelector(".icon-container");
let iconInput = document.querySelector("#create-icon");
let titleInput = document.querySelector("#create-title");
let focusInput = document.querySelector("#create-focus-time");
let breakInput = document.querySelector("#create-break-time");
const availableIcons = [
    "alarm",
    "assignment",
    "build",
    "commute",
    "delete",
    "grade",
    "shopping_cart",
    "create",
    "mail",
    "weekend",
    "local_cafe",
    "local_phone",
    "local_florist",
    "local_pizza",
    "restaurant",
    "wc"
  ];

// Render form options on load
window.addEventListener('load', () => {
  db = new SaiDB();
  db.init();

  // Render Icons
  availableIcons.forEach(icon => {
    const el = createIconEl(icon);
    iconContainer.append(el);
  });
});

const selectIcon = icon => {
  iconInput.value = icon;
};

const createIconEl = icon => {
    let el = document.createElement("div");
    el.value = icon;
    el.tabIndex = 0;
    el.onclick = () => selectIcon(icon);

    let iconEl = document.createElement("i");
    iconEl.classList.add("material-icons");
    iconEl.innerText = icon;

    el.append(iconEl);

    return el;
}

window.back = () => {
  console.log("Back!");
  window.location.href = "/";
};

window.createItem = event => {
  event.preventDefault();
  let item = new Item(
    titleInput.value,
    iconInput.value,
    focusInput.value * 60000,
    breakInput.value * 60000
  );

  console.log("Creating Item", item);

  db.addItem(item).then(res => {
    window.location.href = "/";
  });
};
