import { IpcMainEvent, ipcMain } from 'electron';
import { createFolder } from "./addProject.ts";
import { manageProjectConfig, selectProject } from './manageConfig.ts';
import { minimizeWindow, closeWindow, changeWindowSize, getWindowState } from './functions/TitleBar.ts';
import { getMainConfig } from './handleConfig/getConfigPath.ts';

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
    console.log('stage 2')
    selectProject(project);
  })

  ipcMain.handle('get-config', (_event: any) => {
    getMainConfig();
  });
}