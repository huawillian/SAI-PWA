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

  window.addItem(item);
};

const selectIcon = icon => {
  iconInput.value = icon;
};

let iconContainer;
let iconInput;
let titleInput;
let focusInput;
let breakInput;

window.addEventListener("load", () => {
  iconContainer = document.querySelector(".icon-container");
  iconInput = document.querySelector("#create-icon");
  titleInput = document.querySelector("#create-title");
  focusInput = document.querySelector("#create-focus-time");
  breakInput = document.querySelector("#create-break-time");

  availableIcons.forEach(icon => {
    let el = document.createElement("div");
    el.value = icon;
    el.tabIndex = 0;

    el.onclick = () => selectIcon(icon);

    let iconEl = document.createElement("i");
    iconEl.classList.add("material-icons");
    iconEl.innerText = icon;

    el.append(iconEl);

    iconContainer.append(el);
  });
});
