import { app } from 'electron';
import { createMainWindow } from './mainWindow.ts';
const path = require('path');

process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

let win:any;

async function createWindow() {
  win = createMainWindow();

  const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }

  const iconPath = path.join(__dirname, '../src/assets/Logo.png');
  win.setIcon(iconPath);
}

app.on('ready', async () => {
  await createWindow();
});