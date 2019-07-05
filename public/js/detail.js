let iconEl;
let titleEl;
let deleteEl;
let focusTimeEl;
let breakTimeEl;
let startEl;
let stopEl;
let backEl;

let itemId = location.search.slice(1).split('&').find(param => param.startsWith('id')).split('=')[1];
let originalFocusTime;
let focusTimeLapse = 0;
let originalBreakTime;
let breakTimeLapse = 0;

let intervalRef;

const formatDigitToString = (num) => {
  if(num < 10) {
    return '0' + num.toString();
  } else {
    return num.toString();
  }
}

const getHour = (milliseconds) => {
  return formatDigitToString(Math.floor((milliseconds % 86400000) / 3600000));
}

const getMin = (milliseconds) => {
  return formatDigitToString(Math.floor((milliseconds % 3600000) / 60000));
}

const getSec = (milliseconds) => {
  return formatDigitToString(Math.floor((milliseconds % 60000) / 1000));
}

const renderTime = () => {
  let focusTime = originalFocusTime - focusTimeLapse;
  focusTimeEl.innerText = `${getHour(focusTime)}:${getMin(focusTime)}:${getSec(focusTime)}`;
  let breakTime = originalBreakTime - breakTimeLapse;
  breakTimeEl.innerText = `${getHour(breakTime)}:${getMin(breakTime)}:${getSec(breakTime)}`;
}

window.deleteItem = () => {
  console.log('deleting item!');
};

window.startItem = () => {
  console.log('starting item!');
  intervalRef = setInterval(() => {
    if(focusTimeLapse < originalFocusTime) {
      focusTimeLapse += 1000;
    } else if(breakTimeLapse < originalBreakTime) {
      breakTimeLapse += 1000;
    } else {
      clearInterval(intervalRef);
    }
    renderTime();
  }, 1000);
};

window.stopItem = () => {
  console.log('stop item!');
  clearInterval(intervalRef);
  focusTimeLapse = 0;
  breakTimeLapse = 0;
  renderTime();
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

        originalFocusTime = item.focusTime;
        originalBreakTime = item.breakTime;

        renderTime();
      } else {
        // TODO: Display error and link back to home
      }
    });
  } else {
    // TODO: Display error and link back to home
  }
});
