var dbPromise;
var db;

if ("indexedDB" in window) {
  dbPromise = window.indexedDB.open("sai-db", 1);

  dbPromise.onsuccess = function(event) {
    console.log("Successfully opened indexedDb", dbPromise.result);
    db = event.target.result;
  };

  dbPromise.onerror = function() {
    console.log("Unable to open indexedDb", dbPromise.error);
  };

  dbPromise.onupgradeneeded = event => {
    console.log("Successfully opened indexedDb", dbPromise.result);
    db = event.target.result;

    if (!db.objectStoreNames.contains("items")) {
      console.log("Creating Items Store", db);
      db.createObjectStore("items", { keyPath: "id", autoIncrement: true });
    }
  };
} else {
  console.log("This browser doesn't support IndexedDB");
}

window.getItems = () => {
  if (db) {
    var tx = db.transaction("items", "readwrite");
    var store = tx.objectStore("items");
    return new Promise(resolve => {
      store.getAll().onsuccess = event => resolve(event.target.result);
    });
  }
};

window.addItem = item => {
  if (db) {
    var tx = db.transaction("items", "readwrite");
    var store = tx.objectStore("items");
    return new Promise(resolve => {
        store.add(item).onsuccess = event => resolve(event.target.result);
    })
  }
};

window.getItem = id => {
  if (db) {
    var tx = db.transaction("items", "readwrite");
    var store = tx.objectStore("items");
    return new Promise(resolve => {
      store.get(id).onsuccess = event => {
        resolve(event.target.result);
      };
    });
  }
};

window.removeItem = id => {
  if (db) {
    var tx = db.transaction("items", "readwrite");
    var store = tx.objectStore("items");
    return new Promise(resolve => {
      store.delete(id).onsuccess = event => {
        resolve(event.target.result);
      };
    });
  }
};
