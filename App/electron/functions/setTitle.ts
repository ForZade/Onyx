import { getMainConfig } from "../handleConfig/getConfig";

export function setTitle() {
    const config: any = getMainConfig();
    const pathParts = config.loadedFilePath;
    console.log(pathParts);

    let title;
    if (pathParts.length >= 2) {
        console.log('this')
        title = pathParts[1].split('.')[0];
    }
    else {
        console.log('that');
        title = '';
    }

    console.log(title);
    return title;
}