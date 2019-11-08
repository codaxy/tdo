import {Repeater, TextField, TextArea, NumberField, Checkbox, Button, PureContainer, LinkButton} from 'cx/widgets';
import { LabelsLeftLayout, LabelsTopLayout } from 'cx/ui';
import Controller from './Controller';


export default <cx>
    <div class="cxb-settings" controller={Controller} >
        <h2>Settings</h2>    

        <h3>Maintenance</h3>

        <div layout={LabelsLeftLayout}>
            <NumberField
                value:bind="settings.deleteCompletedTasksAfterDays"
                enabled:bind="settings.deleteCompletedTasks"
                style="width:5rem"
                inputStyle="text-align:center"
                label={<Checkbox value:bind="settings.deleteCompletedTasks">Delete completed tasks after</Checkbox>}
                help="day(s)"
            />
            <NumberField
                value:bind="settings.purgeDeletedObjectsAfterDays"
                label="Purge deleted objects after"
                style="width:5rem"
                inputStyle="text-align:center"
                help="day(s)"
            />
        </div>

        <h3>Task Styles</h3>
        <div style="overflow: auto">
            <Repeater records:bind="settings.taskStyles">
                <PureContainer layout={LabelsTopLayout}>
                    <span text:tpl="{[{$index}+1]}." />
                    <TextField value:bind="$record.regex" label="Regex" />
                    <TextField value:bind="$record.style" label="Style" />
                    <TextField value:bind="$record.className" label="Class" />
                    <a href="#" onClick="removeTaskStyle">Remove</a>
                </PureContainer>
            </Repeater>
        </div>
        <p>
            <a href="#" onClick="addTaskStyle">Add</a>
        </p>

        <h3>Custom CSS</h3>

        <TextArea value:bind="settings.css" rows={20} style="width: 600px; width:100%" />
    </div>
</cx>;
