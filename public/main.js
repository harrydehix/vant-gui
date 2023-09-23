const { app, BrowserWindow } = require('electron')
const path = require("path")

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        },
        icon: __dirname + "/logo_512.png",
        backgroundColor: "#000",
        show: false,
    })

    //load the index.html from a url
    console.log(`Running in ${process.env.NODE_ENV} mode!`)
    if (process.env.NODE_ENV === "production") {
        const file = __dirname.endsWith("build") ? path.join(__dirname, "index.hmtl") : path.join(__dirname, "../build/index.html");
        win.loadFile(file);
    } else {
        win.loadURL("http://localhost:3000");
    }

    win.on('ready-to-show', function () {
        setTimeout(() => {
            win.show();
            win.focus();
        }, 100)
    });

    // Open the DevTools.
    // win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.

    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.