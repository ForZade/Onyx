import { app } from 'electron';
import { setDocument } from "../updaters/updateMainConfig";
import { getMainConfig } from "../handleConfig/getConfig";
const fs = require('fs');
const path = require('path');

export function OpenFile(givenPath?: string) {
    
    let pathParts: any;
    
    if(givenPath) { // On document click
        pathParts = givenPath.split(path.sep).slice(-2)
        setDocument(pathParts);
    }

    if(!givenPath) { // On app load
        try {
            const config = getMainConfig();

            if(config && config.loadedFilePath) {
                pathParts = config.loadedFilePath;
            }
        }
        catch(err: any) {
            return Error(err);
        }
    }

    let newPath;
    let data;

    if (pathParts && pathParts.length >= 2) {
        newPath = path.join(app.getAppPath(), 'projects', pathParts[0], pathParts[1]);
        console.log('New path:', newPath);
        if(fs.existsSync(newPath)) {
            data = fs.readFileSync(newPath, 'utf8');
        }
        else {
            data = '';
        }
    }
    else {
        data = '';
    }

    return data;
}