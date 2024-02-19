
const fs = require('fs');
const path = require('path');

export function createFolder(name:string, _icon: string, _color: string) {
    
  if (!name) {
    const baseName = 'New Project';
    
    if (!fs.existsSync(path.join(__dirname, '..', 'src', 'assets', 'test', baseName))) {
      name = baseName;
    } 
    else {
      let counter = 2;
      while (fs.existsSync(path.join(__dirname, '..', 'src', 'assets', 'test', `${baseName} ${counter}`))) {
          counter++;
      }

      name = `${baseName}(${counter})`;
    }
  }

    const assetsPath = path.join(__dirname, '..', 'src', 'assets', 'test', name);

    try {
      fs.mkdirSync(assetsPath);
      createProjectConfig(name, _icon, _color);
  
    } catch (error:any) {
      console.error(`Error adding folder: ${error.message}`);
    }
}

interface ProjectConfig {
  [key: string]: {
    icon: string;
    color: string;
  };
}

function createProjectConfig(name: string, icon: string, color: string) {
  const configPath = path.join(__dirname, '..', 'src', 'assets', 'test', 'projects.conf');

  try {
    // Read existing config file if it exists, or create a new empty one
    let config: ProjectConfig = {};
    if (fs.existsSync(configPath)) {
      config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    }

    // Add or update the project configuration
    config[name] = {
      icon: icon,
      color: color,
    };

    // Write the updated config back to the file
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  } catch (error: any) {
    console.error(`Error adding project: ${error.message}`);
  }
}