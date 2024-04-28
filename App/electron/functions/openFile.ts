import { setDocument } from "../updaters/updateMainConfig";
import { getMainConfig } from "../handleConfig/getConfig";
const fs = require('fs');

export function OpenFile(path?: string) {
    if(path) { // On document click
        setDocument(path);
    }

    if(!path) { // On app load
        try {
            const config = getMainConfig();
            if(config && config.loadedFilePath) {
                path = config.loadedFilePath;
            }
        }
        catch(err: any) {
            return Error(err);
        }
    }

    let data = fs.readFileSync(path, 'utf8');

    return data;
}