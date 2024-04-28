import { IpcMainEvent, ipcMain } from 'electron';
import { createFolder } from "./addProject.ts";
import { manageProjectConfig } from './manageConfig.ts';
import { selectProject } from './updaters/updateMainConfig.ts';
import { minimizeWindow, closeWindow, changeWindowSize, getWindowState } from './functions/TitleBar.ts';
import { getMainConfig } from './handleConfig/getConfig.ts';
import { setTheme } from './functions/setTheme.ts';
import { setLanguage } from './functions/setLanguage.ts';
import { loadFileTree } from './loaders/FileTree.ts';
import { SaveFile } from './functions/saveFile.ts';
import { OpenFile } from './functions/openFile.ts';
import { ContextMenu } from './functions/ContextMenu.ts';
import { setTitle } from './functions/setTitle.ts';
import { createNoteFile } from './functions/createNote.ts';

const titleBarActions = [
  { action: 'get-window-state', function: getWindowState, },
  { action: 'minimize-window', function: minimizeWindow },
  { action: 'change-window-size', function: changeWindowSize },
  { action: 'close-window', function: closeWindow }
]

export function setupIpcHandlers(win: any) {
  titleBarActions.forEach((action) => {
    ipcMain.on(action.action, (event) => {
      action.function(win, event);
    })
  })

  ipcMain.on('create-folder', (_event: IpcMainEvent, projectName:string, projectIcon: string, projectColor: string) => {
    createFolder(projectName, projectIcon, projectColor);
  });

  ipcMain.on('change-project-config', (_event: any, label: string, color: string, icon:string, oldProjectName: string) => {
    manageProjectConfig(label, color, icon, oldProjectName);
  });

  ipcMain.on('select-project', (_event: any, project: string) => {
    selectProject(project);
  })

  ipcMain.on('load-file-tree', (event: any) => {
    const fileTree = loadFileTree();
    console.log(fileTree);
    event.sender.send('load-file-tree', fileTree);
  })

  ipcMain.on('get-config', (event: any) => {
    const config = getMainConfig();

    event.sender.send('get-config', config);
  });

  ipcMain.on('setup-app', (event: any) => {
    const content = {
      theme: setTheme(),
      language: setLanguage()
    }

    event.sender.send('setup-app', content);
  });

  ipcMain.on('open-file', (event: any, path: string) => {
    const data = OpenFile(path);
    const title = setTitle();

    console.log(data, title);

    event.sender.send('open-file', data, title)
  })

  ipcMain.on('save-file', (_event: any, content: any) => {
    SaveFile(content);
  });

  ipcMain.on('show-context-menu', (_event, x, y) => {
    const contextMenu = ContextMenu.buildContextMenu();
    contextMenu.popup({ x, y });
  });

  ipcMain.on('create-note', (_event: any, path: string) => {
    console.log('create')
    createNoteFile(path);
  })

  ipcMain.on('start-renaming-item', (event: any,) => {
    event.sender.send('start-renaming-item', true);
  })
}