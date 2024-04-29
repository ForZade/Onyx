import { app } from 'electron';
import { getMainConfigPath } from '../handleConfig/getConfig';
const fs = require('fs');
// const path = require('path');

interface ConfigProps { // Sets config types
    theme?: string;
    language?: string;
    lastLoaded?: string;
    loadedFilePath?: string;
}

export function updateMainConfig(items: ConfigProps) {
    if (app.isReady()) {
        const configPath = getMainConfigPath();
        
        // Defines config
        let config: ConfigProps = {
            theme: 'system',
            language: 'en',
            lastLoaded: '',
            loadedFilePath: '',
        };

        // If config exists, reads config
        if (fs.existsSync(configPath)) {
            config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        }

        if(items.theme) {
            config.theme = items.theme;
        }
        if (items.language) {
            config.language = items.language;
        }
        if (items.lastLoaded) {
            config.lastLoaded = items.lastLoaded;
        }
        if (items.loadedFilePath) {
            config.loadedFilePath = items.loadedFilePath;
        }

        fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
    }
}

export function selectProject(project: string) {
    if (project) {
        const config: ConfigProps = {};
        config.lastLoaded = project;
        updateMainConfig(config);
    }
}

export function setLanguage(language: string) {
    if (language) {
        const config: ConfigProps = {};
        config.language = language;
        updateMainConfig(config);
    }
}

export function setConfigTheme(theme: string) {
    if (theme) {
        const config: ConfigProps = {};
        config.theme = theme;
        updateMainConfig(config);
    }
}

export function setDocument(path: any) {
    const config: ConfigProps = {};
    config.loadedFilePath = path;
    console.log(config.loadedFilePath);
    updateMainConfig(config);
}