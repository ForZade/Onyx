import { app } from 'electron';
import { getMainConfig } from '../handleConfig/getConfigPath';
const fs = require('fs');
const path = require('path');

export function setTheme() {
    app.on('ready', () => {
        const appElement = document.getElementById('app');
        const config = getMainConfig();
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const theme = config.theme === 'system' ? (prefersDarkMode ? 'dark' : 'light') : config.theme;

        appElement?.classList.toggle('dark', theme === 'dark');
        
        if (theme === 'light') {
            appElement?.classList.remove('dark');
        }
    });
}