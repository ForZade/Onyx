import { app } from 'electron';
import { getProjectConfigPath, getProjectPath, getMainConfigPath, ConfigProp } from "./getConfig";
const fs = require('fs');

interface ProjectConfigProp {
    label: string;
    icon: string;
    color: string;
    loadedFilePath?: string;
}

export function manageProjectConfig(label: string, color: string, icon:string, oldProjectName: string) {
    const configPath = getProjectConfigPath(oldProjectName);

    try {
        // Read existing config file if it exists, or create a new empty one
        let config: ProjectConfigProp = {
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

export function selectProject(project: string) {
    if (app.isReady()) {
        const configPath = getMainConfigPath()
        let config: ConfigProp = {
            theme: 'system',
            language: 'en',
            lastLoaded: ''
        };

        config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        config.lastLoaded = project;

        fs.writeFileSync(configPath, JSON.stringify(config, null, 4));

        console.log('Config has been changed:' + config);
        return config;
    }
}