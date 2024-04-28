import { getMainConfig } from "../handleConfig/getConfig";

export function setTitle() {
    const path: any = getMainConfig();

    const item = path.loadedFilePath.split('/').pop();
    const title = item.split('.')[0];

    return title;
}