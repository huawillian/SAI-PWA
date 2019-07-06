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