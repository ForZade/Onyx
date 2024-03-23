import { ipcMain } from 'electron';
const fs = require('fs');
const path = require('path');

const languageJson = require('../src/assets/Languages.json');

function checkLanguage() {
    const configPath = path.join(__dirname, '..', 'src', 'assets', 'test', 'main.conf');
    let language = 'en' as string;

    if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        if (config && config.language) {
            language = config.language;
        }
    }

    return language;
}

export function languageTexts() {
    ipcMain.handle('get-language', (_event: any) => {
        const language = checkLanguage();

        return languageJson[language];
    });
};