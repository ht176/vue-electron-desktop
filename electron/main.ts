import { app, BrowserWindow, ipcMain } from 'electron';
// import { attach } from 'electron-as-wallpaper';
import path from 'node:path';

const { attach, detach, refresh } = require('electron-as-wallpaper');

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');

let mainWindow: BrowserWindow | null;
const windows: BrowserWindow[] = [];
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Test active push message to Renderer-process.
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    // win.loadFile('dist/index.html')
    mainWindow.loadFile(path.join(process.env.DIST, 'index.html'));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    mainWindow = null;
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('set-wallpaper', (_ev, title: string, url: string) => {
  setWallpaper(title, url);
});

ipcMain.on('stop-wallpaper', async (_ev, title: string, url: string) => {
  const win = createOtherWindow(title, url)!;
  // win.close();
  try {
    detach(win);
  } catch (e) {
    console.log('stopWallpaperError');
  }
  win.fullScreen = false;
  win.hide();
  refresh();
});

async function setWallpaper(title: string, url: string) {
  const win = createOtherWindow(title, url)!;
  win.fullScreen = true;
  try {
    attach(win, {
      transparent: true,
      forwardKeyboardInput: true,
      forwardMouseInput: true,
    });
  } catch (e) {
    console.log('May already exist');
  }
  win.show();
}

function createOtherWindow(title: string, url: string) {
  const existWin = windows.find((w) => w.title === title);

  if (existWin) {
    existWin.focus();
  } else {
    const win = new BrowserWindow({
      title: title,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
      frame: false,
      fullscreen: true,
    });

    if (VITE_DEV_SERVER_URL) {
      const devUrl = `${VITE_DEV_SERVER_URL}${url}`;
      // const devUrl = `https://www.nayuki.io/res/full-screen-clock-javascript/full-screen-clock-24hr-with-seconds.html`;
      win.loadURL(devUrl);
    } else {
      // win.loadFile('dist/index.html')
      win.loadFile(path.join(process.env.DIST, `index.html/${url}`));
    }
    windows.push(win);
  }
  return existWin ?? windows.find((w) => w.title === title);
}

app.whenReady().then(createWindow);
