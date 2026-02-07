const fs = require('fs');
const path = require('path');
const { contextBridge, ipcRenderer } = require('electron');

function readAppVersion() {
  const versionFile = path.join(__dirname, '..', 'VERSION');
  try {
    const v = fs.readFileSync(versionFile, 'utf8').trim();
    if (v) return v;
  } catch {}
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
    const v = String(pkg.version || '').trim();
    if (v) return v;
  } catch {}
  return '0.0.0';
}

contextBridge.exposeInMainWorld('appInfo', {
  name: 'Translator Studio Desktop',
  version: readAppVersion(),
  platform: process.platform,
});

contextBridge.exposeInMainWorld('desktopApi', {
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  pickFile: (options) => ipcRenderer.invoke('pick-file', options || {}),
  pickSaveFile: (options) => ipcRenderer.invoke('pick-save-file', options || {}),
});
