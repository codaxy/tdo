import { Controller } from 'cx/ui';
import { append } from 'cx/data';
import { firestore } from "../../data/db/firestore";
import { showErrorToast, toast } from "../../components/toasts";
import {debounce} from "cx/util";

export default class extends Controller {
    onInit() {
        this.addTrigger('saveSettings', ['settings'], debounce(settings => {
            if (!this.store.get('settingsLoaded'))
                return;
            let userId = this.store.get('user.id')
            firestore
                .collection('users')
                .doc(userId)
                .set(settings)
                .catch(showErrorToast);
        }, 3000))
    }

    addTaskStyle(e) {
        e.preventDefault();
        this.store.update('settings.taskStyles', append, {});
    }

    
    removeTaskStyle(e, { store }) {
        e.preventDefault();
        let style = store.get('$record');
        this.store.update('settings.taskStyles', styles => styles.filter(x => x != style));
    }

    defaultTheme(e) {
        e.preventDefault();
        this.store.set("settings.css", "")
    }
    darkTheme(e) {
        e.preventDefault();
        this.store.set("settings.css", "body {background-color: rgba(255,255,255,1); color: black;} \nh1 {color: rgba(130,80,200, 1);text-shadow: 0px 0px rgba(220, 220, 220, 0.4);} \nh2 {color: rgba(130,80,200, 1);style: bold;text-shadow: 0px 0px rgba(220, 220, 220, 0.9);} \nh3 {color: black}div {color: black} \n.cxe-numberfield-input {color: black}\n.cxe-textfield-input {color: black;border: 4px solid rgba(220, 220, 220, 0);background-color: rgba(180, 180, 180, 0.25);}\n.cxe-checkbox-input-check {color: black;background-color: rgba(200, 200, 200, 0.6);}\n.cxe-checkbox-input {border: 2px solid rgba(240, 240, 240, 0);background-color: rgba(180, 180, 180, 0.5);}\na {color: black}\n/*Settings-Custom CSS*/\n.cxe-textarea-input {color: black;border: 5px solid rgba(220, 220, 220, 0);background-color: rgba(180, 180, 180, 0.25);}\n/*Settings-maintenance*/\n.cxe-numberfield-input {border: 4px solid rgba(220, 220, 220, 0);background-color: rgba(246, 246, 246, 0.25);}\n/*Add list, add new board - card*/\n.cxb-tasklist {border-radius: 5px;margin: 10px !important;box-shadow: 10px 6px 10px rgba(1, 1, 1, 0.1);border: 4px solid rgba(220, 220, 220, 0);background-color: rgba(220, 220, 220, 0.25);}\n/*Add list, add new board - tekst*/\n.cxe-tasklist-add {color: black !important;}\n.doing {background-color: rgba(140, 140, 140, 0.25) !important;}\n.ideas {background-color: rgba(240, 160, 0, 0.2) !important;}\n.margina {border: 4px solid rgba(220, 220, 220, 0) !important;border-radius: 5px;margin: 10px !important;box-shadow: 10px 6px 10px rgba(1, 1, 1, 0.1);background-color: rgba(220, 220, 220, 0.25);}\n.plavkasta {background-color: rgba(0, 80, 200, 0.1)}\n.cxe-layout-header {background-color: rgba(100,100,100, 0.1)}")
    }
}
