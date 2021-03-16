import {
    firebase
} from "./firebase";
const firestore = firebase.firestore();

firestore.enablePersistence()
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            console.warn("Multiple tabs open, persistence can only be enabled in one tab at a a time.");
        } else if (err.code == 'unimplemented') {
            console.warn("The current browser does not support all of the features required to enable persistence")
        }

        throw err;
    });

export {
    firestore
};
