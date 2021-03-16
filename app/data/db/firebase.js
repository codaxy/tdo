import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import "firebase/messaging";
import "firebase/performance";

import config from "./config";
if (!firebase.default.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions();
let messaging = null;
try {
    if (firebase.messaging.isSupported()) {
        messaging = firebase.messaging();
        messaging.usePublicVapidKey(config.messagingSenderId);
    }
} catch (e) {}
const perf = firebase.performance();

export {
    firebase
}


