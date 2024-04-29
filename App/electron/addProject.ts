import { app } from 'electron';
const fs = require('fs');
const path = require('path');

export function createFolder(name:string, _icon: string, _color: string) {
    
  if (!name) {
    const baseName = 'New Project';
    
    if (!fs.existsSync(path.join(app.getAppPath(), 'projects', baseName))) {
      name = baseName;
    } 
    else {
      let counter = 2;
      while (fs.existsSync(path.join(app.getAppPath(), 'projects', `${baseName} ${counter}`))) {
          counter++;
      }

      name = `${baseName}(${counter})`;
    }
  }

    const assetsPath = path.join(app.getAppPath(), 'projects', name);

    try {
      fs.mkdirSync(assetsPath);
      createProjectConfig(name, _icon, _color);
  
    } catch (error:any) {
      console.error(`Error adding folder: ${error.message}`);
    }
}

interface ProjectConfig {
    label: string;
    icon: string;
    color: string;
}

function createProjectConfig(name: string, icon: string, color: string) {
  const configPath = path.join(app.getAppPath(), 'projects', name, 'project.conf');

  try {
    // Read existing config file if it exists, or create a new empty one
    let config: ProjectConfig = {
      label: '',
      icon: '',
      color: '',
    };
    if (fs.existsSync(configPath)) {
      config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    }

    // Add or update the project configuration
    config = {
      label: name,
      icon: icon,
      color: color,
    };

    // Write the updated config back to the file
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  } catch (error: any) {
    console.error(`Error adding project: ${error.message}`);
  }
}