const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('appInfo', {
  name: 'Translator Studio Desktop',
  version: '0.1.0',
});

contextBridge.exposeInMainWorld('desktopApi', {
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
});
