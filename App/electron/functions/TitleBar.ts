export function minimizeWindow(win: any) {
    if (win) {
        win.minimize();
    }
}

export function changeWindowSize(win: any) {
    if (win) {
        if (win.isMaximized()) {
          win.unmaximize();
        } else {
          win.maximize();
        }
    }
  
    const isMaximized = win.isMaximized();
    win.webContents.send('window-state', isMaximized);
}

export function closeWindow(win: any) {
    if (win) {
        win.close();
    }
}

export function getWindowState(win: any, event: any) {
    const isMaximized = win.isMaximized();
    event.reply('window-state', isMaximized);
}