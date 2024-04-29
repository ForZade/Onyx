import { app } from "electron";
const fs = require('fs');
const path = require('path');
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
    let newPath;

    const config = getMainConfig();
    if(config && config.loadedFilePath) {
        const pathParts = config.loadedFilePath;
        newPath = path.join(app.getAppPath(), 'projects', pathParts[0], pathParts[1]);
    }

    fs.writeFileSync(newPath, JSON.stringify(content, null, 4), 'utf-8');
}