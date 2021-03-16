import { ShallowIndex } from "./ShallowIndex";
import { HasId } from "./HasId";
import {firestore} from "../data/db/firestore"

export class CollectionTracker<T extends HasId> {
    collection: firestore.CollectionReference;
    onUpdate: () => void;
    unsubscribe: () => void;
    index: ShallowIndex<T>;

    constructor(collection, index: ShallowIndex<T>, onUpdate) {
        this.collection = collection;
        this.index = index;
        this.onUpdate = onUpdate;
    }

    start() {
        this.stop();
        let loaded = false;
        this.unsubscribe = this.collection.onSnapshot(snapshot => {
            let dirty = false;
            snapshot.docChanges().forEach(({ doc, type }) => {
                let data: any = doc.data();
                if (type != "removed") {
                    if (this.index.index({ ...data })) dirty = true;
                } else {
                    if (this.index.remove(data.id)) dirty = true;
                }
            });
            if (dirty || !loaded) this.onUpdate();
            loaded = true;
        });
    }

    stop() {
        this.unsubscribe && this.unsubscribe();
        this.unsubscribe = null;
    }

    update(
        id: string,
        data: Partial<T>,
        options: { suppressUpdate?: boolean; suppressSync? } = {}
    ) {
        let t = Object.assign({ id }, this.index.get(id), data, {
            lastSyncTime: Date.now()
        });

        if (!this.index.index(t)) return false;

        if (!options.suppressUpdate) this.onUpdate();

        if (!options.suppressSync) {
            this.collection.doc(id).set(t);
        }

        return true;
    }

    forceUpdate() {
        this.onUpdate();
    }

    add(item: T, options: { suppressUpdate?: boolean; suppressSync? } = {}) {
        return this.update(item.id, item, options);
    }

    async delete(id: string) {
        await this.collection.doc(id).delete();
        this.index.remove(id);
    }
}
