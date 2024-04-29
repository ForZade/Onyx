import { setDocument } from "../updaters/updateMainConfig";

const fs = require('fs');

export function deleteNote(path: string) {
    setDocument([]);
    
    setTimeout(() => {
        fs.unlink(path, (err: any) => {
            if (err) throw err
        })
    }, 100)
}