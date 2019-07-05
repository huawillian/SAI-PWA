if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then(res => {
      console.log("Service worker register succeeded!");
    })
    .catch(err => {
      console.log("Service worker register failed!", err);
    });
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", e => {
  console.log("beforeinstallprompt event triggered!");
  e.preventDefault();
  deferredPrompt = e;
});

const promptAddToHomeScreen = () => {
  if (deferredPrompt) {
    console.log("Prompt Install to Home Screen displayed!");
    deferredPrompt.prompt();
  }
};

window.getItems = () => {
  // TODO: Fetch items
  return new Promise(resolve => {
    let result = [new Item(), new Item(), new Item(), new Item()];

    result[0].id = "1";
    result[1].id = "2";
    result[2].id = "3";
    result[3].id = "4";

    resolve(result);
  });
};
