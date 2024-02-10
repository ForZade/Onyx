import { IpcMainEvent, ipcMain } from 'electron';
import { createFolder } from "./addProject.ts";

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

  ipcMain.on('create-folder', (_event: IpcMainEvent, projectName:string, projectIcon: string, projectColor: string) => {
    createFolder(projectName, projectIcon, projectColor);
  });
}