// import { app, BrowserWindow } from 'electron'
// import path from 'path'
// import isDev from 'electron-is-dev'

const { app, BrowserWindow } = require('electron');
const path = require('path');
// const isDev = require('electron-is-dev');
const { ipcMain, shell } = require('electron');


let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            icon: path.join(__dirname, 'public/assets/logo.png') //
        },
    });

    // mainWindow.loadURL(
    //     isDev
    //         ? 'http://localhost:3000'
    //         : `file://${path.join(__dirname, '../build/index.html')}`
    // );
    mainWindow.loadURL(`file://${path.join(process.cwd(), '../../build/index.html')}`);


    mainWindow.on('closed', () => mainWindow = null);
    // mainWindow.removeMenu();

    // mainWindow.webContents.openDevTools();
    mainWindow.webContents.on('did-fail-load', () => {
        console.error('Error: La ventana no pudo cargar el contenido')
    })
}


app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null || BrowserWindow.getAllWindows().length === 0) createWindow()
});

ipcMain.on('open-external', (event, url) => {
    shell.openExternal(url);
});