import { Toast, Text, Button } from "cx/widgets";

export function toast(options) {
    Toast.create({
        timeout: 3000,
        ...options
    }).open();
}

export function showErrorToast(err) {
    toast({
        message: String(err),
        mod: "error"
    });
}

export function showUndoToast(message, undoCallback) {
    return Toast.create({
        mod: "warning",
        style: "padding: 0",
        timeout: 4000,
        items: (
            <cx>
                <div style="display: flex">
                    <div style="padding: 8px">
                        <Text value={message} />
                    </div>
                    <div style="display: flex;">
                        <Button
                            dismiss
                            mod="hollow"
                            icon="undo"
                            onClick={() => undoCallback()}
                        />
                        <Button mod="hollow" dismiss icon="close" />
                    </div>
                </div>
            </cx>
        )
    }).open();
}
