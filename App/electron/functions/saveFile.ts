const fs = require('fs');
import { getMainConfig } from "../handleConfig/getConfig";

let isSaving = false;

export function SaveFile(content: any) {
    if(!isSaving) {
        isSaving = true;
        setTimeout(() => {
            isSaving = false;
            saveFunction(content)
        }, 1000);

        saveFunction(content);
    }
}

function saveFunction(content: any) {
    let path;

    const config = getMainConfig();
    if(config && config.loadedFilePath) {
        path = config.loadedFilePath;
    }

    fs.writeFileSync(path, JSON.stringify(content, null, 4), 'utf-8');
}