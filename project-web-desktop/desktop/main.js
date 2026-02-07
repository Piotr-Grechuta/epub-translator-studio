const { app, BrowserWindow, dialog, ipcMain, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

app.whenReady().then(() => {
  ipcMain.handle('open-external', async (_event, url) => {
    if (typeof url !== 'string') return false;
    const u = url.trim();
    if (!u) return false;
    await shell.openExternal(u);
    return true;
  });

  ipcMain.handle('pick-file', async (_event, options = {}) => {
    const win = BrowserWindow.getFocusedWindow();
    const filters = Array.isArray(options.filters) ? options.filters : [];
    const result = await dialog.showOpenDialog(win || undefined, {
      title: typeof options.title === 'string' ? options.title : 'Wybierz plik',
      properties: ['openFile'],
      filters,
      defaultPath: typeof options.defaultPath === 'string' ? options.defaultPath : undefined,
    });
    if (result.canceled || !Array.isArray(result.filePaths) || !result.filePaths.length) return '';
    return result.filePaths[0];
  });

  ipcMain.handle('pick-save-file', async (_event, options = {}) => {
    const win = BrowserWindow.getFocusedWindow();
    const filters = Array.isArray(options.filters) ? options.filters : [];
    const result = await dialog.showSaveDialog(win || undefined, {
      title: typeof options.title === 'string' ? options.title : 'Wybierz plik wynikowy',
      defaultPath: typeof options.defaultPath === 'string' ? options.defaultPath : undefined,
      filters,
    });
    if (result.canceled || typeof result.filePath !== 'string') return '';
    return result.filePath;
  });

  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
