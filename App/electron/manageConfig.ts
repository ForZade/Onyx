import { ipcMain, app } from 'electron';
const fs = require('fs');
const path = require('path');

interface ConfigProp {
    theme: string;
    language: string;
    lastLoaded: string;
}


export function findConfig() {
    ipcMain.handle('get-config', (_event: any) => {
        if (app.isReady()) {
            const configPath = path.join(__dirname, '..', 'src', 'assets', 'test', 'main.conf');
            let config: ConfigProp = {
                theme: 'system',
                language: 'en',
                lastLoaded: ''
            };

            if (fs.existsSync(configPath)) {
                config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
            } else {
                fs.writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf-8');
            }

            return config;
        }
    });
}

interface ProjectConfig {
    label: string;
    icon: string;
    color: string;
}

export function manageProjectConfig(label: string, color: string, icon:string, oldProjectName: string) {
    
        console.log('clicked')
        const configPath = path.join(__dirname, '..', 'src', 'assets', 'test', oldProjectName, 'project.conf');

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

            const oldFolderPath = path.join(__dirname, '..', 'src', 'assets', 'test', oldProjectName );
            const newFolderPath = path.join(__dirname, '..', 'src', 'assets', 'test', label );
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
        const configPath = path.join(__dirname, '..', 'src', 'assets', 'test', 'main.conf');
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
