import Controller from "./Controller";
import { LinkButton } from "cx/widgets";
import { LabelsLeftLayout } from "cx/ui";

export default
    <cx>
        <div class="cxb-settings" controller={Controller}>
            <h2>SignIn</h2>

            <div visible-expr="{user.anonymous}">
                <p ws>
                    Your data is saved to the database using a temporary user account.
                    You may loose access if you clear the local storage data from your browser.
                    Please sign in to use the application on multiple devices or browsers.
            </p>
            </div>

            <form>
                <div layout={LabelsLeftLayout}>
                    <LinkButton mod="login-primary" href="#" onClick="signInWithGoogle">
                        SignIn with Google
                    </LinkButton>
                    <LinkButton mod="login-primary" href="#" onClick="signInWithFacebook">
                        SignIn with Facebook
                    </LinkButton>
                    <LinkButton mod="login-primary" href="#" onClick="signInWithTwitter">
                        SignIn with Twitter
                    </LinkButton>
                    <LinkButton mod="login-primary" href="#" onClick="signInWithGitHub">
                        SignIn with Github
                    </LinkButton>
                    <LinkButton mod="login-primary" href="#" onClick="signInWithMicrosoft">
                        SignIn with Microsoft
                    </LinkButton>
                </div>
            </form>
        </div>
    </cx>

