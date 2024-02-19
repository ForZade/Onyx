import { ipcMain, app} from 'electron';
const fs = require('fs');
const path = require('path');

export function setupProjectLoader() {
    ipcMain.handle('get-folders', (_event: any, folderPath: string) => {
        if (app.isReady()) {
          const folderFullPath = path.join(__dirname, '..', 'src', 'assets', folderPath);
          const projectConfigPath = path.join(folderFullPath, 'projects.conf');   
      
          try {
            const folders = fs.readdirSync(folderFullPath, { withFileTypes: true })
              .filter((dirent: any) => dirent.isDirectory())
              .map((dirent: any) => {
                const projectName = dirent.name;
      
                // Read the project configuration from the projects.conf file
                const projectConfig = readProjectConfig(projectConfigPath, projectName);
      
                // Return the project object without the id property
                return { label: projectName, ...projectConfig };
              });
      
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
      console.log('Configuration file not found. Creating a default configuration.');
      return { icon: 'tabler:folder', color: 'text-od-icon' };
    }

    const configContent = fs.readFileSync(configPath, 'utf8');

    const projectsConfig = JSON.parse(configContent);

    // Directly extract the project configuration based on the project name
    const projectConfig = projectsConfig[projectName];

    // If there's no specific configuration for the project, use default values
    return projectConfig || { icon: 'tabler:folder', color: 'text-od-icon' };
  } catch (error) {
    console.error('Error reading project configuration:', error);
    return { icon: 'tabler:folder', color: 'text-od-icon' };
  }
}