import { ipcMain } from 'electron';

export function setupIpcHandlers(win: any) {
  ipcMain.on('get-window-state', (event) => {
    const isMaximized = win.isMaximized();
    event.reply('window-state', isMaximized);
  });

  // Drops down the app window
  ipcMain.on('minimize-window', () => {
    if (win) {
      win.minimize();
    }
  });

  //Maximizes & Minimized the app window
  ipcMain.on('change-window-size', () => {
    if (win) {
      if (win.isMaximized()) {
        win.unmaximize();
      } else {
        win.maximize();
      }
    }

    const isMaximized = win.isMaximized();
    win.webContents.send('window-state', isMaximized);
  });

  // Closes the app window
  ipcMain.on('close-window', () => {
    if (win) {
      win.close();
    }
  });
}