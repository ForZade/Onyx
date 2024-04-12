import { app } from 'electron';
const fs = require('fs');
const path = require('path');

export function getMainConfigPath() {
    return path.join(__dirname, '..', 'src', 'assets', 'test', 'main.conf');
}

export interface ConfigProp {
    theme: string;
    language: string;
    lastLoaded: string;
}

export interface ProjectConfigProp {
    label: string;
    icon: string;
    color: string;
}

export function getMainConfig() { //Previous findConfig function
    if(app.isReady()) {
        try {
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
        catch(err) {
            console.log(err);
        }
    }
}

export function getProjectConfigPath(project: string) {
    return path.join(__dirname, '..', 'src', 'assets', 'test', project, 'project.conf');
}

export function getProjectConfig(project: string) {
    if(app.isReady()) {
        try {
            const configPath = getProjectConfigPath(project);
            let config: ProjectConfigProp = {
                label: '',
                icon: '',
                color: '',
            };

            if (fs.existsSync(configPath)) {
                config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
            }
            else {
                fs.writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf-8');
            }

            return config;
        }
        catch(err) {
            console.log(err);
        }
    }
}

export function getProjectPath(project: string) {
    return path.join(__dirname, '..', 'src', 'assets', 'test', project);
}