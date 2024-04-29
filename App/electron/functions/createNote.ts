import { app } from "electron";
import { getMainConfig } from "../handleConfig/getConfig";

const fs = require('fs');
const path = require('path');

export function createNoteFile(title: string) {
    const data = {
        type: "doc",
        content: [
            {
                type: "text",
                content: "New note"
            },
        ]
    }

    const jsonData = JSON.stringify(data, null, 2);

    const config: any = getMainConfig();
    const project = config.lastLoaded;


    const filePath = path.join(app.getAppPath(), 'projects', project,)

    fs.writeFileSync(`${filePath}/${title}.json`, jsonData, 'utf-8');
    console.log('note created')
}