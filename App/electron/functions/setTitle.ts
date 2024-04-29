import { getMainConfig } from "../handleConfig/getConfig";

export function setTitle() {
    const isWindows = process.platform === 'win32';

    const path: any = getMainConfig();
    let item;
    if(!isWindows) {
        item = path.loadedFilePath.split('/').pop();
    }
    else {
        item = path.loadedFilePath.split('\\').pop();
    }
    const title = item.split('.')[0];

    return title;
}