import { app } from 'electron';
import { getMainConfigPath } from './getConfigPath';
const fs = require('fs');

interface ConfigProp {
    theme: string;
    language: string;
    lastLoaded: string;
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