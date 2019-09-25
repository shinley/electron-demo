const { app, BrowserWindow } = require('electron')

function createWindow() {
    win = new BrowserWindow({allowFullscreen: true, show: false, webPreferences: {
            nodeIntegration: true
        } });
    win.loadFile('index.html');
    win.on('ready-to-show', ()=> {
        win.show();
    })
}

app.on('ready', createWindow);