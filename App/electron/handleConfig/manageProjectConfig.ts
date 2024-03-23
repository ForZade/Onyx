import { getProjectConfigPath, getProjectPath } from "./getConfigPath";
const fs = require('fs');

interface ProjectConfig {
    label: string;
    icon: string;
    color: string;
}

export function manageProjectConfig(label: string, color: string, icon:string, oldProjectName: string) {
    
    console.log('clicked')
    const configPath = getProjectConfigPath(oldProjectName);

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
            label: label,
            icon: icon,
            color: color,
        };

        console.log('worked kind of')

        // Write the updated config back to the file
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

        const oldFolderPath = getProjectPath(oldProjectName);
        const newFolderPath = getProjectPath(label);
        console.log(oldFolderPath);
        console.log(newFolderPath);

        fs.renameSync(oldFolderPath, newFolderPath);
    }
    catch (error: any) {
        console.log('failed')
    }
}