// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, Tray, globalShortcut, shell } = require("electron");

const path = require("path");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let isQuiting;

if (handleSquirrelEvent(app)) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}

function initialize() {
    makeSingleInstance();

    // Create the browser window.
    function createWindow() {
        mainWindow = new BrowserWindow({
            width: 1400,
            height: 800,
            webPreferences: {
                nodeIntegration: false,
                nativeWindowOpen: true,
            },
            icon: getIconPath("favicon64x64.png")
        });

        mainWindow.setMenuBarVisibility(false);
        //mainWindow.webContents.openDevTools();

        // and load the index.html of the app.
        // mainWindow.loadFile('index.html')

        // we are loading app from the url instead of local app
        mainWindow.loadURL("https://tdo.cxjs.io/", { userAgent: "Chrome" });

        //load external urls in the browser
        mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
            if (isExternalURL(url)) {
                event.preventDefault();
                shell.openExternal(url);
            }
            else {
                // open window as modal
                event.preventDefault();
                Object.assign(options, {
                    modal: true,
                    parent: mainWindow,
                    javascript: true,
                    minimizable: false,
                    maximizable: false,
                    maxWidth: 1300,
                    maxHeight: 700,
                    width: 1000,
                    height: 700,
                    center: true,
                });
                let modal = new BrowserWindow(options);
                modal.webContents.on('new-window', (event, url) => {
                    event.preventDefault();
                    shell.openExternal(url);
                });
                modal.removeMenu();
                modal.webContents.userAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) electron/1.0.0 Chrome/53.0.2785.113 Electron/1.4.3 Safari/537.36";
                event.newGuest = modal;
            }
        });

        // Open the DevTools.
        // mainWindow.webContents.openDevTools()

        mainWindow.on("close", event => {
            if (!isQuiting) {
                event.preventDefault();
                mainWindow.hide();
            }
        });

        mainWindow.on("minimize", event => {
            event.preventDefault();
            mainWindow.hide();
        });

        // mainWindow.on('show', function () {
        //     appIcon.setHighlightMode('always')
        // })

        // Emitted when the window is closed.
        mainWindow.on("closed", function () {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            mainWindow = null;
        });
    }

    const showWindow = () => {
        mainWindow.show();
        mainWindow.focus();
    };

    let tray = null,
        launchOnStartup = false;

    let settings = app.getLoginItemSettings();
    if (settings) {
        launchOnStartup = settings.openAtLogin;
    } else {
        //the app should auto start
        app.setLoginItemSettings({
            openAtLogin: true,
            path: electron.app.getPath("exe")
        });
    }

    function createTray() {
        tray = new Tray(getIconPath("favicon16x16.png"));

        const contextMenu = Menu.buildFromTemplate([
            { label: "Open tdo", click: () => showWindow() },
            {
                label: "Quit tdo",
                click: () => {
                    isQuiting = true;
                    app.quit();
                }
            },
            {
                label: 'Launch on startup',
                checked: launchOnStartup,
                type: 'checkbox',
                click: (item) => {
                    app.setLoginItemSettings({
                        openAtLogin: item.checked
                    });
                }
            },
            {
                label: 'Developer tools', click: () => {
                    mainWindow.webContents.openDevTools();
                }
            },
        ]);

        tray.setToolTip("Tdo...");
        tray.setContextMenu(contextMenu);

        tray.on("double-click", () => {
            if (mainWindow.isVisible()) {
                mainWindow.hide();
            } else {
                showWindow();
            }
        });
    }

    function registerGlobalShortcuts() {
        const ret = globalShortcut.register("Control+Shift+insert", () => showWindow());

        if (!ret) {
            console.log("Keyboard shortcut registration failed");
        }

        // Check whether a shortcut is registered.
        //console.log(globalShortcut.isRegistered("Control+Shift+insert"));
    }

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on("ready", () => {
        createTray();
        createWindow();
        registerGlobalShortcuts();
    });

    app.on("before-quit", function () {
        isQuiting = true;
    });

    // Quit when all windows are closed.
    app.on("window-all-closed", function () {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== "darwin") app.quit();
    });

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null) createWindow();
    });
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
    if (process.mas) return;

    app.requestSingleInstanceLock();

    app.on("second-instance", () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}

app.on("will-quit", () => {
    // Unregister a shortcut.
    // globalShortcut.unregister("Control+Shift+insert");

    // Unregister all shortcuts.
    globalShortcut.unregisterAll()
});

function getIconPath(iconName) {
    let pathToIcon = path.join(__dirname, `/assets/app-icon/png/${iconName}`);
    return pathToIcon;
}

initialize();

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function handleSquirrelEvent(application) {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function (command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, {
                detached: true
            });
        } catch (error) { }

        return spawnedProcess;
    };

    const spawnUpdate = function (args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus

            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-uninstall':
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated

            application.quit();
            return true;
    }
};

function isExternalURL(url) {
    if (url.startsWith("https://tdo.cxjs.io/")) return false;
    return url.startsWith('http:') || url.startsWith('https:');
}
