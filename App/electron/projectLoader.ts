import { ipcMain, app} from 'electron';
const fs = require('fs');
const path = require('path');

export function setupProjectLoader() {
    ipcMain.handle('get-folders', (_event: any, folderPath: string) => {
        if (app.isReady()) {
          const folderFullPath = path.join(__dirname, '..', 'src', 'assets', folderPath);
<<<<<<< HEAD
          
=======
          const projectConfigPath = path.join(folderFullPath, 'projects.conf');   
      
>>>>>>> bf351ef89d75a11b0792af2db82f7c772c971235
          try {
            const folders = fs.readdirSync(folderFullPath, { withFileTypes: true })
              .filter((dirent: any) => dirent.isDirectory())
              .map((dirent: any) => {
                const projectName = dirent.name;
                const projectFolderPath = path.join(folderFullPath, projectName);
                const projectConfigPath = path.join(projectFolderPath, 'project.conf');

                // Read the project configuration from the projects.conf file inside the project folder
                const projectConfig = readProjectConfig(projectConfigPath, projectName);
      
                // Return the project object without the id property
                return { ...projectConfig };
              });
      
            console.log(folders);
            return folders;
          } catch (error) {
            console.error('Error reading directory:', error);
            return [];
          }
        } else {
          // If the app is not ready, return an empty array
          return [];
        }
      });
}

function readProjectConfig(configPath:any, projectName:any) {
  try {

    if (!fs.existsSync(configPath)) {
      console.log('Configuration file not found for project:', projectName, configPath);
      return { icon: 'folder', color: 'text-od-icon' };
    }

    const configContent = fs.readFileSync(configPath, 'utf8');

    const projectConfig = JSON.parse(configContent);

    // If there's no specific configuration for the project, use default values
    return projectConfig || { icon: 'folder', color: 'text-od-icon' };
  } catch (error) {
    console.error('Error reading project configuration for project:', projectName, error);
    return { icon: 'folder', color: 'text-od-icon' };
  }
}