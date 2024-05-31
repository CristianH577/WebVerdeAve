const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    isElectron: true,
    openExternal: (url) => ipcRenderer.send('open-external', url)
});