import {HtmlElement, TextField, TextArea, LookupField, Button, enableTooltips} from 'cx/widgets';
import {LabelsTopLayout} from 'cx/ui';
import upperCase from 'upper-case';
import { expression } from 'cx/data';
enableTooltips();

export default <cx>
    <div class="cxb-listeditor">
        <div layout={{type: LabelsTopLayout, mod: 'stretch'}}>
            <TextField
                value:bind="$list.name"
                label="Name"
                autoFocus
                style="width:100%;"
            />
        </div>

        <br/>

        <div>
            <Button onClick="onMoveListLeft">Move Left</Button>
            <Button onClick="onMoveListRight" style="float:right">Move Right</Button>
        </div>

        <div layout={{type: LabelsTopLayout, mod: 'stretch'}}>
            <TextField
                value:bind="$list.headerClass"
                label="Header Class"
                placeholder="CSS class"
                style="width:100%;"
                tooltip={{
                    visible: {bind: "page.showToolTips"},
                    placement: "right",
                    mouseTrap: true,
                    text: "Assign a custom CSS class that you've defined in settings. The changes will apply only to the list's header",
                }}
            />
        </div>

        <div layout={{type: LabelsTopLayout, mod: 'stretch'}}>
            <TextArea
                value:bind="$list.headerStyle"
                label="Header Style"
                placeholder="color"
                reactOn="input"
                style="width:100%;"
                tooltip={{
                    visible: {bind: "page.showToolTips"},
                    placement: "right",
                    mouseTrap: true,
                    text: "Write your own custom CSS settings to apply on the list's header",
                }}
            />
        </div>

        <div layout={{type: LabelsTopLayout, mod: 'stretch'}}>
            <TextField
                value:bind="$list.className"
                label="List Class"
                placeholder="CSS class"
                style="width:100%;"
                tooltip={{
                    visible: {bind: "page.showToolTips"},
                    placement: "right",
                    mouseTrap: true,
                    text: "Assign a custom CSS class that you've defined in settings. The changes will apply to the whole list",
                }}
            />
        </div>

        <div layout={{type: LabelsTopLayout, mod: 'stretch'}}>
            <TextArea
                value:bind="$list.listStyle"
                label="List Style"
                placeholder="width, background"
                reactOn="input"
                style="width:100%;"
                tooltip={{
                    visible: {bind: "page.showToolTips"},
                    placement: "right",
                    mouseTrap: true,
                    text: "Write your own custom CSS settings to apply on the whole list",
                }}
            />
        </div>

        <br/>

        <div>
            <Button 
            onClick="onSaveList">Save</Button>
            <Button 
            mod="danger" 
            confirm="Are you sure?" 
            onClick="onDeleteList" 
            style="float:right" 
            tooltip={{
                visible: {bind: "page.showToolTips"},
                placement: "down",
                mouseTrap: true,
                text: "Delete the entire list",
                }}
            >
            Delete
            </Button>
        </div>
        <br/>
    </div>
</cx>
