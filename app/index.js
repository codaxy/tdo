import { startHotAppLoop, History } from "cx/ui";
import { Debug } from "cx/util";
import Routes from "./routes";

import "./index.scss";

import { Store } from "cx/data";
const store = new Store();

History.connect(
  store,
  "url"
);

Debug.enable("app-data");

startHotAppLoop(module, document.getElementById("app"), store, Routes);

// Used in dev mode for testing
// if ('serviceWorker' in navigator) {
if (location.protocol === 'https:' && navigator.serviceWorker) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            // console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.error('SW registration failed: ', registrationError);
        });
    });
}
