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
}
