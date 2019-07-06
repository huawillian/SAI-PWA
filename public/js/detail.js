let db;
const iconEl = document.querySelector('.detail-icon');
const titleEl = document.querySelector('.detail-title');
const deleteEl = document.querySelector('.detail-delete');
const focusTimeEl = document.querySelector('.detail-focus-time-left');
const breakTimeEl = document.querySelector('.detail-break-time-left');
const startEl = document.querySelector('.detail-start');
const stopEl = document.querySelector('.detail-stop');
const backEl = document.querySelector('.detail-back');
const itemId = location.search.slice(1).split('&').find(param => param.startsWith('id')).split('=')[1];
let originalFocusTime;
let focusTimeLapse = 0;
let originalBreakTime;
let breakTimeLapse = 0;
let intervalRef;

// Render details page on load
window.addEventListener('load', () => {
  db = new SaiDB();
  db.init().then(() => {
    if(itemId) {
      db.getItem(itemId).then(item => {
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
});

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
  db.removeItem(itemId);
  window.location.href = '/';
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
