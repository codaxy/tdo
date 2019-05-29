// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, Tray} = require('electron')

const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let isQuiting

function initialize() {
  makeSingleInstance()


  function createWindow () {
    // Create the browser window.
    // let pathToWindowIcon = path.join(__dirname, '/assets/app-icon/png/favicon64x64.png');
    let pathToWindowIcon = getIconPath('favicon64x64.png');
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      },
      icon: pathToWindowIcon
    })

    mainWindow.setMenuBarVisibility(false)

    // and load the index.html of the app.
    // mainWindow.loadFile('index.html')

    // we are loading app from the url instead of local app
    mainWindow.loadURL('https://tdo.cxjs.io/')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    mainWindow.on('close', (event) => {
      if (!isQuiting) {
        event.preventDefault();
        mainWindow.hide();
      }
    })

    mainWindow.on('minimize', (event) => {
        event.preventDefault()
        mainWindow.hide()
    })

    // mainWindow.on('show', function () {
    //     appIcon.setHighlightMode('always')
    // })

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null
    })
  }

  function createTray() {
    // let pathToTrayIcon = path.join(__dirname, '/assets/app-icon/png/favicon16x16.png');
    let pathToTrayIcon = getIconPath('favicon16x16.png');
    tray = new Tray(pathToTrayIcon)

    const contextMenu = Menu.buildFromTemplate([
      { label: 'Open tdo', click: () => showWindow() },
      { label: 'Quit tdo', click: () => {
        isQuiting = true;
        app.quit()
      }}
    ])

    tray.setToolTip('Tdo...')
    tray.setContextMenu(contextMenu)

    // tray.on('right-click', toggleWindow)
    tray.on('double-click', toggleWindow)
    // tray.on('click', toggleWindow)
  }

  const toggleWindow = () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      showWindow()
    }
  }

  const showWindow = () => {
    // const position = getWindowPosition()
    // window.setPosition(position.x, position.y, false)
    mainWindow.show()
    mainWindow.focus()
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.

  app.on('before-quit', function () {
    isQuiting = true;
  });

  app.on('ready', () => {
    createTray()
    createWindow()
  })

  // Quit when all windows are closed.
  app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()
  })
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance () {
  if (process.mas) return

  app.requestSingleInstanceLock()

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

function getIconPath(iconName) {
    let pathToIcon = path.join(__dirname, `/assets/app-icon/png/${iconName}`);
    return pathToIcon;
}

initialize()


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
