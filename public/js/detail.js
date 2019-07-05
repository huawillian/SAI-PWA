let iconEl;
let titleEl;
let deleteEl;
let focusTimeEl;
let breakTimeEl;
let startEl;
let stopEl;
let backEl;

let itemId = location.search.slice(1).split('&').find(param => param.startsWith('id')).split('=')[1];

window.deleteItem = () => {
  console.log('deleting item!');
};

window.startItem = () => {
  console.log('starting item!');
};

window.stopItem = () => {
  console.log('stop item!');
};

window.addEventListener("load", () => {
  iconEl = document.querySelector('.detail-icon');
  titleEl = document.querySelector('.detail-title');
  deleteEl = document.querySelector('.detail-delete');
  focusTimeEl = document.querySelector('.detail-focus-time-left');
  breakTimeEl = document.querySelector('.detail-break-time-left');
  startEl = document.querySelector('.detail-start');
  stopEl = document.querySelector('.detail-stop');
  backEl = document.querySelector('.detail-back');

  if(itemId) {
    window.getItems().then(items => {
      let item = items.find(item => item.id = itemId);

      if(item) {
        console.log('Loading Item:', item);
        iconEl.innerText = item.icon;
        titleEl.innerText = item.title;
        focusTimeEl.innerText = item.focusTime;
        breakTimeEl.innerText = item.breakTime;
      } else {
        // TODO: Display error and link back to home
      }
    });
  } else {
    // TODO: Display error and link back to home
  }
});
