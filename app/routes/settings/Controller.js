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
    matrixTheme(e) {
        e.preventDefault();
        this.store.set("settings.css", "body {\nbackground-color: rgba(30,30,30,1);\ncolor: green;\n}\nh1 {\ncolor: green; \ntext-shadow: 0px 0px rgba(220, 220, 220, 0); \n} \nh2 { \ncolor: green; style: bold; \ntext-shadow: 0px 0px rgba(220, 220, 220, 0); \n} \nh3 { \ncolor: rgba(51,190,51,1) \n} \ndiv { \ncolor: rgba(51,190,51,1) } \n.cxe-numberfield-input { \ncolor: rgba(51,190,51,1) \n} \n.cxe-textfield-input { \ncolor: rgba(51,190,51,1); \nborder: 4px solid rgba(220, 220, 220, 0); \nbackground-color: rgba(200, 200, 200, 0.25); \n} \n.cxe-checkbox-input-check { \ncolor: rgba(51,190,51,1); \nbackground-color: rgba(200, 200, 200, 0.4); \n} \n.cxe-checkbox-input { \nborder: 2px solid rgba(240, 240, 240, 0); \nbackground-color: rgba(200, 200, 200, 0.4); \n} \na { color: rgba(51,190,51,1) } \n.cxe-textarea-input { \ncolor: rgba(51,190,51,1); \nborder: 5px solid rgba(220, 220, 220, 0); \nbackground-color: rgba(200, 200, 200, 0.25); \n} \n.cxe-numberfield-input { \nborder: 4px solid rgba(220, 220, 220, 0); \nbackground-color: rgba(200, 200, 200, 0.25); \n} \n.cxb-tasklist { \nborder-radius: 0px; margin: 1px !important; \nborder: 4px solid rgba(220, 220, 220, 0); \nbackground-color: rgba(100, 100, 100, 0.1); \n} \.cxe-tasklist-add { \ncolor: rgba(51,190,51,1) !important; \n} \n.cxe-layout-header { \nbackground-color: rgba(30,30,30, 1) \n}\n.cxe-tooltip-arrow-fill {\n color: rgba(85,85,85,1);\n} \n.cxe-tooltip-arrow-border { \ncolor: green; \n} \n.cxb-tooltip { \nbackground-color: rgba(85,85,85,1); \nborder: 1px solid green; \nfont-size: 95%; \n} \n")
    }
    darkTheme(e) {
        e.preventDefault();
        this.store.set("settings.css", "::placeholder { \ncolor: rgba(230, 230, 230, 0.7) !important;\n} \nbody {\nbackground-color: rgba(35,35,35,1);\ncolor: white;\n} \nh1{ \ncolor: #BB86FC;\ntext-shadow: 0px 0px rgba(220, 220, 220, 0.4); \n} \nh2{ \ncolor: #BB86FC; \nstyle: bold; \ntext-shadow: 0px 0px rgba(220, 220, 220, 0.9); \n} \nh3 { \ncolor: white \n} \ndiv { \ncolor: white \n} \n.cxe-numberfield-input { \ncolor: white \n} \n.cxe-textfield-input { \ncolor: white; \nborder: 4px solid rgba(220, 220, 220, 0); \nbackground-color: rgba(246, 246, 246, 0.25); \n} \n.cxe-checkbox-input-check { \ncolor: white; \nbackground-color: rgba(221, 221, 221, 0.4); \n} \n.cxe-checkbox-input { \nborder: 2px solid rgba(240, 240, 240, 0); \nbackground-color: rgba(220, 220, 220, 0.4); \n} \na { \ncolor: white \n} \n.cxe-textarea-input { \ncolor: white; \nborder: 5px solid rgba(220, 220, 220, 0); \nbackground-color: rgba(246, 246, 246, 0.25); \n} \n.cxe-numberfield-input { \nborder: 4px solid rgba(220, 220, 220, 0); \nbackground-color: rgba(246, 246, 246, 0.25); \n} \n.cxb-tasklist { \nborder-radius: 5px; \nmargin: 10px !important; \nbox-shadow: 10px 6px 10px rgba(1, 1, 1, 0.1); \nborder: 4px solid rgba(220, 220, 220, 0); \nbackground-color: rgba(220, 220, 220, 0.25); \n} \n.cxe-tasklist-add { \ncolor: white !important; \n} \n.cxe-layout-header { \nbackground-color: rgba(30,30,30, 1) \n} \n.cxe-tooltip-arrow-fill { \ncolor: rgba(160,120,205,1); \n} \n.cxe-tooltip-arrow-border { \ncolor: rgba(160,120,205,1); \n} \n.cxb-tooltip { \nbackground-color: rgba(160,120,205,1); \nborder: 1px solid rgba(160,120,205,1); \nfont-size: 95%; \n} \n")
    }
    capuccinoTheme(e) {
        e.preventDefault();
        this.store.set("settings.css", "body {\n background-color: rgba(142,81,0,0.1); \ncolor: black; \n} \nh1 { \ncolor: black; \ntext-shadow: 1px 1px rgba(220, 220, 220, 0.4); \n}\n h2 { \ncolor: black; style: bold; \ntext-shadow: 1px 1px rgba(220, 220, 220, 0.9); \n} \nh3 { \ncolor: black } \ndiv { \ncolor: black \n} \n.cxe-numberfield-input { \ncolor: black \n} \n.cxe-textfield-input {\n color: black; \nborder: 0px solid rgba(220, 220, 220, 0.8); \nbackground-color: rgba(246, 246, 246, 0.4); \n} \n.cxe-checkbox-input-check { \ncolor: black; \nbackground-color: rgba(255, 255, 255, 0.4); \n} \n.cxe-checkbox-input { \nborder: 0px solid rgba(240, 240, 240, 0.7); \nbackground-color: rgba(255, 255, 255, 0.2); \n} \na { color: black } \n.cxe-textarea-input { \ncolor: black; \nborder: 0px solid rgba(220, 220, 220, 1); \nbackground-color: rgba(246, 246, 246, 0.4); \n} \n.cxe-numberfield-input { \nborder: 0px solid rgba(220, 220, 220, 1); \nbackground-color: rgba(246, 246, 246, 0.4); \n} \n.cxb-tasklist { \nborder-radius: 5px; \nmargin: 10px !important; \nbox-shadow: 5px 3px 10px rgba(1, 1, 1, 0.1); \nborder: 0px solid rgba(220, 220, 220, 1); \nbackground-color: rgba(142, 81, 0, 0.05); \n} \n.cxe-tasklist-add { \ncolor: black !important; } \n .cxe-layout-header {\n background-color: rgba(142,81,0, 0.2);\nbox-shadow: 0px 2px 10px rgba(1,1,1, 0.15)\n}\n.cxe-tooltip-arrow-fill {\n color: rgb(238, 231, 222, 1);\n }\n \n .cxe-tooltip-arrow-border {\n color: rgb(238, 231, 222, 1);\n }\n \n .cxb-tooltip {\n background-color: rgb(238, 231, 222, 1);\n border: 1px solid rgb(238, 231, 222, 1);\n font-size: 95%;\n }\n")
    }
    paperboyTheme(e) {
        e.preventDefault();
        this.store.set("settings.css", "body { \nbackground-color: rgba(40,40,40,1);\n}\nh1 {\ncolor: rgba(255, 255, 204, 0.8); \ntext-shadow: 0px 0px rgba(220, 220, 220, 0); \n}\nh2 { \ncolor: rgba(255,225,204,0.8); \nstyle: bold; \n text-shadow: 0px 0px rgba(220, 220, 220, 0); \n} \nh3 { \ncolor: rgba(255,225,204,0.8) } \ndiv { \ncolor: rgba(255,225,204,0.8) } \n.cxe-numberfield-input { \ncolor: rgba(255,225,204,0.8) \n}\n.cxe-textfield-input { \ncolor: rgba(255,225,204,0.8); \nborder: 4px solid rgba(220, 220, 220, 0); \nbackground-color: rgba(200, 200, 200, 0.25); \n}\n.cxe-checkbox-input-check { \ncolor: rgba(255,225,204,0.8); \nbackground-color: rgba(200, 200, 200, 0.4); \n} \n.cxe-checkbox-input { \nborder: 2px solid rgba(240, 240, 240, 0); \nbackground-color: rgba(200, 200, 200, 0.4);\n } \na {\n color: rgba(255,225,204,0.8)\n } \n.cxe-textarea-input { \ncolor: rgba(255,225,204,0.8); \nborder: 5px solid rgba(220, 220, 220, 0); \nbackground-color: rgba(200, 200, 200, 0.25);\n } \n.cxe-numberfield-input { \nborder: 4px solid rgba(220, 220, 220, 0); \nbackground-color: rgba(200, 200, 200, 0.25);\n } \n.cxb-tasklist { \nborder-radius: 0px; margin: 2px !important; \nbox-shadow: 10px 6px 10px rgba(1, 1, 1, 0.1); \nborder: 1px solid rgba(255,225,204,0.8); \nbackground-color: rgba(100, 100, 100, 0.1);\n } \n.cxe-tasklist-add { \ncolor: rgba(255,225,204,0.8) !important;\n } \n.cxe-layout-header { \nbackground-color: rgba(30,30,30, 0.5) \n} \n.menu-item {\n.cxb-draghandle { \nposition: absolute important! }\n.cxe-tooltip-arrow-fill {\ncolor: rgba(210,170,255,1);\n }\n.cxe-tooltip-arrow-border {\ncolor: rgba(210,170,255,1);\n }\n .cxb-tooltip {\nbackground-color: rgba(210,170,255,1);\nborder: 1px solid rgba(210,170,255,1);\n font-size: 95%;\n}\n")
    }
    lightTheme(e) {
        e.preventDefault();
        this.store.set("settings.css", "body {\nbackground-color: rgba(250,250,250,1); \ncolor: black; \nfont-family: 'Roboto', sans-serif;\n}\nh1 {\ncolor: rgba(255,255,255, 1);\n text-shadow: 0px 0px rgba(220, 220, 220, 0.4);\n} \nh2 {\ncolor: rgba(130,80,200, 1);\nstyle: bold;\ntext-shadow: 0px 0px rgba(220, 220, 220, 0.9);\n} \nh3 {\ncolor: black\n}\ndiv {\ncolor: black\n} \n.cxe-numberfield-input {\ncolor: black;\nbackground-color: rgba(180, 180, 180, 0.25) !important\n}\n.cxe-textfield-input {\ncolor: black;\nborder: 4px solid rgba(220, 220, 220, 0);\nbackground-color: rgba(180, 180, 180, 0.25);\n}\n.cxe-checkbox-input-check {\ncolor: black;\nbackground-color: rgba(200, 200, 200, 0.6);\n}\n.cxe-checkbox-input {\nborder: 2px solid rgba(240, 240, 240, 0);\nbackground-color: rgba(180, 180, 180, 0.5);\n}\na {\ncolor: black\n}\n.cxe-textarea-input {\ncolor: black;\nborder: 5px solid rgba(220, 220, 220, 0);\nbackground-color: rgba(180, 180, 180, 0.25);\n}\n.cxe-numberfield-input {\nborder: 4px solid rgba(220, 220, 220, 0);\nbackground-color: rgba(246, 246, 246, 0.25);\n}\n.cxb-tasklist {\nborder-radius: 5px;\nmargin: 10px !important;\nbox-shadow: 10px 6px 10px rgba(1, 1, 1, 0.1);\nborder: 4px solid rgba(220, 220, 220, 0);\nbackground-color: rgba(220, 220, 220, 0.25); \nfont-size: 120%\n}\n.cxe-tasklist-add {\ncolor: black !important;\n}\n.cxe-layout-header {\nbackground-color: rgba(100,0,230, 0.45);\nbox-shadow: 0px 5px 10px rgba(1,1,1, 0.2)\n}\n.cxe-tooltip-arrow-fill {\ncolor: rgba(210,170,255,1);\n }\n.cxe-tooltip-arrow-border {\ncolor: rgba(210,170,255,1);\n }\n.cxb-tooltip {\nbackground-color: rgba(210,170,255,1);\nborder: 1px solid rgba(210,170,255,1);\nfont-size: 95%;\n}\n" )
    }
}
