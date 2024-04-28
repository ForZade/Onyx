const fs = require('fs');

export function createNoteFile(path: string) {
    const data = {
        type: "doc",
        content: [
            {
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        text: "Ar net vat va šitaip atskirti"
                    }
                ]
            },
            {
                type: "horizontalRule"
            },
            {
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        text: "Tekstą."
                    }
                ]
            }
        ]
    }

    const jsonData = JSON.stringify(data, null, 2);

    fs.writeFileSync(`${path}/file.json`, jsonData, 'utf-8');
    console.log('note created')
}