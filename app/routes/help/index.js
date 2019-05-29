import { HtmlElement, Repeater, List, Menu, TextField, Radio, LabeledContainer, Button, PureContainer } from 'cx/widgets';
import { LabelsLeftLayout, UseParentLayout } from 'cx/ui';
import { Md } from 'app/components/Md';

export default <cx>
    <div class="cxb-help">
        <Md>
            ## Welcome to tdo!

            tdo is a no muss, no fuss note taking app, created in the attempt to simplify the process of managing notes.

            The best way to start using tdo effectively is to just dive in and explore.

            We strongly believe in the concept of "learning by doing"!

            With developers in mind, we added a bunch of shortcuts and customization features to improve productivity.

            

            ## Help

            We love shortcuts and here are the ones that are currently supported in tdo.


            ### Keyboard Shortcuts (Windows)

            `Up` or `k` Move cursor to the previous task

            `Down` or `j` Move cursor to the next task

            `Left` or `h` Move cursor to the previous list

            `Right` or `l` Move cursor to the next list

            `Enter` or `i` Edit task at cursor position

            `Space` or `x` Mark task as completed

            `/` Search

            `o` Insert task below cursor position

            `Insert` or `Shift` + `O` Insert task at cursor position

            `Delete` or `Shift` + `D` Delete task

            `Escape` or `Ctrl` + `Enter` Exit task edit mode

            `Escape` (when cursor is not in a task list) Move cursor to the first task list

            -----------

            `Ctrl` + `Left` Move task to the previous list

            `Ctrl` + `Right` Move task to the next list

            `Ctrl` + `Up` Move task up

            `Ctrl` + `Down` Move task down

            Use the double-click to edit lists and tasks.

            
            ### Looks

            #### CSS?
            Yes, we love editing our note's title in CSS!

            Actually ...  we love editing everything editable in CSS so we made tdo completely **hackable**.
            
            Don't like the way tdo looks? Change it and make it shine just the way you want!

            Try putting something like ```color:red;``` in the List Style, Board Style or Header Style fields while creating boards or lists.
            
            Did we mention that tdo supports live previews?
            
            And also the blazing fast kind of previews. Just saying.  

            #### Markdown?

            Markdown is fully supported. Why not do something like this in your notes: 

            **Get milk** => (md: \**Get milk**)

            _Get milk_ => (md: \_Get milk_)

            #### Get milk (md: \#### Get milk)


        </Md>
        <Md>
            ## Under the hood

            tdo was built using the CxJS framework. It's the ticking heart behind all of the tdo awesomeness.

            CxJS is the best JavaScript framework for building administrative applications, management consoles, dashboards and other applications containing a large number of data-related UI elements such as forms, tables and charts.
            
            More information about the CxJS framework is available on the [official website](https://cxjs.io/). 

            ## License
            tdo is licensed with the MIT license. Find more about that [here](https://opensource.org/licenses/MIT).

        </Md>
    </div>
</cx>;