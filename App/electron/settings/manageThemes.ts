import { ipcMain, app} from 'electron';
const fs = require('fs');
const path = require('path');

interface ConfigProp {
    theme: string;
}


export function findConfig() {
    ipcMain.handle('set-theme', (_event: any, theme: string) => {
        if (app.isReady()) {
            const configPath = path.join(__dirname, '..', 'src', 'assets', 'test', 'main.conf');
            
            fs.readFile(configPath, 'utf8', (err:any, data:any) => {
                if (!err) {
                    let config: ConfigProp = JSON.parse(data);
                    config.theme = theme;

                    fs.writeFile(configPath, JSON.stringify(config, null, 4), 'utf8');
                }
            });
        }
    });
}
