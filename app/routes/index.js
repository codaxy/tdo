import { HtmlElement, Tab, TextField, Route, Menu, MenuItem, Submenu, Sandbox, Repeater, PureContainer, Link } from 'cx/widgets';
import { FirstVisibleChildLayout, executeKeyboardShortcuts } from 'cx/ui';

import Board from './board';
import Settings from './settings';
import SignIn from './signIn';
import Help from './help';
import NewBoard from "./new";
import Controller from './Controller';
import "./keyboard-shortcuts";

const BoardItems = <cx>
    <PureContainer>
        <Repeater
            records-bind="boards"
            filter={b => !b.deleted}
            sortField="order"
            sortDirection="ASC"
            keyField="id"
        >
            <MenuItem
                autoClose
                mod={{
                    active: { expr: '{url}=="~/b/" + {$record.id}' }
                }}
                pad
            >
                <Link href-tpl="~/b/{$record.id}"
                    className-bind="$record.headerClass"
                    style-bind="$record.headerStyle"
                    text-bind="$record.name"
                />
            </MenuItem>
        </Repeater>

        <MenuItem pad mod={{ active: { expr: '{url}=="~/new"' } }}>
            <Link href="~/new">Add Board</Link>
        </MenuItem>

        <div class="spacer" visible-expr="{layout.mode}=='desktop'" />
        <hr visible-expr="{layout.mode}=='phone'" />
    </PureContainer>
</cx>;

const MenuItems = <cx>
    <PureContainer>
        <MenuItem mod={{ active: { expr: '{url}=="~/settings"' } }} pad>
            <Link href="~/settings">
                Settings
            </Link>
        </MenuItem>

        <MenuItem mod={{ active: { expr: '{url}=="~/help"' } }} pad>
            <Link href="~/help">
                Help <code>?</code>
            </Link>
        </MenuItem>

        <div class="spacer" visible-expr="{layout.mode}=='desktop'" />
        <hr visible-expr="{layout.mode}!='desktop'" />
        <MenuItem pad>
            <a href="https://github.com/codaxy/tdo" target="_blank">Report/Suggest</a>
        </MenuItem>

        <div class="spacer" visible-expr="{layout.mode}=='desktop'" />
        <MenuItem pad>
            <Link href="~/signIn" visible-expr="{user.anonymous}">
                SignIn
            </Link>
            <Submenu visible-expr="!{user.anonymous}" arrow>
                <a text-tpl="{user.displayName}" />
                <MenuItem putInto="dropdown">
                    <Link href="#" onClick="signOut">Sign Out</Link>
                </MenuItem> 
            </Submenu>
        </MenuItem>
    </PureContainer>
</cx>;

export default <cx>
    <div
        class="cxb-layout"
        style="display: flex; flex-direction: column; height: 100%; width: 100%"
        controller={Controller}
        onKeyDown={executeKeyboardShortcuts}
    >
        <style innerHtml-bind="settings.css"/>
        <Sandbox key-bind="url" storage-bind="pages">
            <header class="cxe-layout-header">
                <h1>tdo</h1>
                <TextField
                    value-bind="search.query"
                    placeholder="Search..."
                    mod="search"
                    id="search"
                    autoFocus
                    inputAttrs={{ autoComplete: "off" }}
                    showClear
                    tooltip={{
                        visible: {bind: "page.showToolTips"},
                        placement: "down",
                        mouseTrap: true,
                        text: "Filter displayed tasks with keywords and boolean search using the &&/|| or AND/OR operators. e.g: item 1 AND/OR item 2",
                    }}                    
                />

                <Menu horizontal>
                    <BoardItems visible-expr="{layout.mode}=='desktop' || {layout.mode}=='tablet'" />
                    <MenuItems visible-expr="{layout.mode}=='desktop'" />
                    <MenuItem visible-expr="{layout.mode}!='desktop'">
                        <Submenu>
                            &#9776;
                            <Menu putInto="dropdown">
                                <BoardItems visible-expr="{layout.mode}=='phone'" />
                                <MenuItems />
                            </Menu>
                        </Submenu>
                    </MenuItem>
                </Menu>
            </header>
            <main 
            class="cxe-layout-main"
            layout={FirstVisibleChildLayout}
            >
                <Route url-bind="url" route="~/settings">
                    <Settings />
                </Route>
                <Route url-bind="url" route="~/help">
                    <Help />
                </Route>
                <Route url-bind="url" route="~/new">
                    <NewBoard />
                </Route>
                <Route url-bind="url" route="~/b/:boardId">
                    <Board />
                </Route>
                <Route url-bind="url" route="~/signIn">
                    <SignIn />
                </Route>
            </main>
        </Sandbox>
    </div>
</cx>;
