import { History, ResizeManager } from "cx/ui";
import { firestore } from "../data/db/firestore";
import { auth } from "../data/db/auth";
import { isNonEmptyArray } from "cx/util";
import { UserBoardTracker } from "../data/UserBoardsTracker";
import { registerKeyboardShortcuts } from "./keyboard-shortcuts";
import { Toast, Button, Text } from "cx/widgets";
import { firebase } from "./../data/db/firebase";
import { showUndoToast } from "../components/toasts";


//TODO: For anonymous users save to local storage

export default ({ store, get, set, init }) => {

    init("settings", {
        deleteCompletedTasks: true,
        deleteCompletedTasksAfterDays: 7,
        purgeDeletedObjectsAfterDays: 3,
        taskStyles: [{
            regex: "!important",
            style: "color: orange"
        }, {
            regex: "#idea",
            style: "color: yellow"
        }]
    });

    let boardTracker = null;

    return {
        onInit() {
            this.store.set("layout.mode", this.getLayoutMode());
            ResizeManager.subscribe(() => {
                this.store.set("layout.mode", this.getLayoutMode());
            });

            this.store.set('settings.showTooltips', true);

            auth.onAuthStateChanged(user => {

                if (!user) {
                    this.signInAnonymously();
                    return;
                }

                if (user.isAnonymous) {
                    this.store.set("user", {
                        id: user.uid,
                        name: "Anonymous",
                        anonymous: true
                    });
                } else {
                    this.store.set("user", {
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        id: user.uid
                    });
                }
            });

            this.addTrigger("boardLoader", ["user.id"], userId => {

                if (!userId)
                    return;

                //clean up
                boardTracker && boardTracker.stop();
                this.unsubscribeSettings && this.unsubscribeSettings();

                boardTracker = new UserBoardTracker(userId, () => {
                    let boards = boardTracker.getActiveBoards();
                    this.store.set("boards", boards);

                    set("boards", boards);

                    if (!isNonEmptyArray(boards)) {
                        History.pushState({}, null, "~/new");
                    }
                    else if (get("url") == "~/")
                        History.pushState({}, null, "~/b/" + boards[0].id);
                });

                boardTracker.start();

                this.unsubscribeSettings = firestore
                    .collection("users")
                    .doc(userId)
                    .onSnapshot(doc => {
                        let data = doc.exists ? doc.data() : {};
                        this.store.update("settings", settings => ({
                            ...settings,
                            ...data
                        }));
                        this.store.set("settingsLoaded", true);
                    });
            }, true);

            this.unregisterKeyboardShortcuts = registerKeyboardShortcuts(store);
        },

        signInAnonymously() {
            firebase.auth().signInAnonymously();
        },

        onDestroy() {
            boardTracker && boardTracker.stop();
            this.unsubscribeSettings && this.unsubscribeSettings();
            this.unregisterKeyboardShortcuts();
        },

        getLayoutMode() {
            if (window.innerWidth >= 1200)
                return "desktop";

            if (window.innerWidth >= 760)
                return "tablet";

            return "phone";
        },

        getBoardTracker() {
            return boardTracker;
        },



        onMoveBoardLeft(e, { store }) {
            let { $board } = store.getData();
            let boards = boardTracker.getActiveBoards();
            let index = boards.findIndex(b => b.id == $board.id);

            if (index > 0) {
                boardTracker.update($board.id, {
                    order: boards[index - 1].order - 0.1
                }, { suppressUpdate: true, suppressSync: true });
                boardTracker.reorder();
            }
        },

        onMoveBoardRight(e, { store }) {
            let { $board } = store.getData();
            let boards = boardTracker.getActiveBoards();
            let index = boards.findIndex(b => b.id == $board.id);

            if (index + 1 < boards.length) {
                boardTracker.update($board.id, {
                    order: boards[index + 1].order + 0.1
                }, { suppressUpdate: true, suppressSync: true });
                boardTracker.reorder();
            }
        },

        onDeleteBoard(e, { store }) {
            let board = store.get("$board");
            boardTracker.update(board.id, {
                deleted: true,
                deletedDate: new Date().toISOString(),
                edit: false
            }, { suppressUpdate: true });
            boardTracker.reorder(true);
            boardTracker.forceUpdate();
            let boards = boardTracker.getActiveBoards();
            History.pushState({}, null, boards.length > 0 ? "~/b/" + boards[0].id : "~/")

            showUndoToast(
                `Board ${board.name} has been deleted`,
                () => this.undoDeleteBoard(board.id));
        },

        undoDeleteBoard(id) {
            boardTracker.update(id, {
                deleted: false,
                deletedDate: null
            }, { suppressUpdate: true });
            boardTracker.reorder(true);
            boardTracker.forceUpdate();
        },

        onSaveBoard(e, { store }) {
            let board = store.get("$board");
            boardTracker.update(board.id, {
                ...board,
                edit: false,
                lastChangeDate: new Date().toISOString()
            })
        },

        onEditBoard(e, { store }) {
            e.preventDefault();
            e.stopPropagation();
            let board = store.get("$board");
            boardTracker.update(board.id, {
                edit: true
            })
        },

        signOut(e) {
            e.preventDefault();
            auth.signOut().then(() => {
                window.location.reload();
            });
        }
    }
}
