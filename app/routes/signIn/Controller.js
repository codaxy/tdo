import { Controller, History } from 'cx/ui';
import { append } from 'cx/data';
import { firestore } from "../../data/db/firestore";
import { auth } from "../../data/db/auth";
import { firebase } from "../../data/db/firebase";
import { showErrorToast, toast } from "../../components/toasts";

export default class extends Controller {
    onInit() {
        
        this.addTrigger("userLogged", ["user.id"], userId => {
            if (!userId)
                return 
            History.pushState({}, null, "~/")    
        })
    }

    signInWithGoogle(e) {
        e.preventDefault();
        let provider = new firebase.auth.GoogleAuthProvider();
        this.signInWithProvider(provider);
    }

    signInWithFacebook(e) {
        e.preventDefault();
        let provider = new firebase.auth.FacebookAuthProvider();
        this.signInWithProvider(provider);
    }

    signInWithTwitter(e) {
        e.preventDefault();
        let provider = new firebase.auth.TwitterAuthProvider();
        this.signInWithProvider(provider);
    }

    signInWithGitHub(e) {
        e.preventDefault();
        let provider = new firebase.auth.GithubAuthProvider();
        this.signInWithProvider(provider);
    }

    signInWithMicrosoft(e) {
        e.preventDefault();
        let provider = new firebase.auth.OAuthProvider('microsoft.com');
        this.signInWithProvider(provider);
    }

    signInWithProvider(provider) {
        auth
            .signInWithPopup(provider)
            .catch(error => {
                toast({
                    message: `Login failed with error code ${error.code}. ${error.message}`,
                    timeout: 15000,
                    mod: "error"
                });
            });
    }
}