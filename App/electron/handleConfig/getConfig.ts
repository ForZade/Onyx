import { ipcMain, app } from 'electron';
import { getMainConfigPath } from './getConfigPath';
const fs = require('fs');

interface ConfigProp {
    theme: string;
    language: string;
    lastLoaded: string;
}


export function getConfig() {
    ipcMain.handle('get-config', (_event: any) => {
        if (app.isReady()) {
            const configPath = getMainConfigPath();
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