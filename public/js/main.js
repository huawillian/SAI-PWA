window.initSw = () => {
  // Register service worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js", {scope: '/'})
      .then(res => {
        console.log("Service worker register succeeded!");
      })
      .catch(err => {
        console.log("Service worker register failed!", err);
      });
  }

  // Get install to home screen prompt event
  let deferredPrompt;
  window.addEventListener("beforeinstallprompt", e => {
    console.log("beforeinstallprompt event triggered!");
    e.preventDefault();
    deferredPrompt = e;
  });

  // Expose function to call add to home screen
  window.promptAddToHomeScreen = () => {
    if (deferredPrompt) {
      console.log("Prompt Install to Home Screen displayed!");
      deferredPrompt.prompt();
    }
  };
};

// Item Class
class Item {
  id;
  title;
  icon;
  focusTime;
  breakTime;

  constructor(
    title = "Default Title",
    icon = "event_note",
    focusTime = "1500000",
    breakTime = "300000"
  ) {
    this.title = title;
    this.icon = icon;
    this.focusTime = focusTime;
    this.breakTime = breakTime;

    this.id = title.trim().replace(" ", "") + Date.now();
  }
}

// IndexedDB Helper Class
class SaiDB {
  db;
  dbName;
  storeName;

  constructor(dbName = "sai-db", storeName = "items") {
    this.dbName = dbName;
    this.storeName = storeName;
  }

  init() {
    return new Promise((resolve, reject) => {
      if ("indexedDB" in window) {
        let dbPromise = window.indexedDB.open(this.dbName, 1);
        dbPromise.onsuccess = event => {
          console.log("Successfully opened indexedDb", event.target.result);
          this.db = event.target.result;
          resolve(this.db);
        };
        dbPromise.onerror = () => {
          console.log("Unable to open indexedDb", dbPromise.error);
          reject()
        };
        dbPromise.onupgradeneeded = event => {
          console.log("Successfully opened indexedDb", event.target.result);
          this.db = event.target.result;
  
          if (!this.db.objectStoreNames.contains(this.storeName)) {
            console.log("Creating Items Store", db);
            this.db.createObjectStore(this.storeName, { keyPath: "id" });
            resolve(this.db);
          }
        };
      } else {
        console.log("This browser doesn't support IndexedDB");
        reject();
      }
    });
  }

  getItems() {
    const tx = this.db.transaction(this.storeName, "readwrite");
    const store = tx.objectStore(this.storeName);
    return new Promise(resolve => {
      store.getAll().onsuccess = event => resolve(event.target.result);
    });
  }

  getItem(id) {
    const tx = this.db.transaction(this.storeName, "readwrite");
    const store = tx.objectStore(this.storeName);
    return new Promise(resolve => {
      store.get(id).onsuccess = event => resolve(event.target.result);
    });
  }

  addItem(item) {
    const tx = this.db.transaction(this.storeName, "readwrite");
    const store = tx.objectStore(this.storeName);
    return new Promise(resolve => {
      store.add(item).onsuccess = event => resolve(event.target.result);
    });
  }

  removeItem(id) {
    const tx = this.db.transaction(this.storeName, "readwrite");
    const store = tx.objectStore(this.storeName);
    return new Promise(resolve => {
      store.delete(id).onsuccess = event => resolve(event.target.result);
    });
  }
}

window.addEventListener('load', () => {
  initSw();
});
