import { setDocument } from "../updaters/updateMainConfig";

const fs = require('fs');

export function deleteNote(path: string) {
    console.log('delete')
    setDocument("NotLoaded");
    
    setTimeout(() => {
        fs.unlink(path, (err: any) => {
            if (err) throw err
        })
    }, 1000)
}