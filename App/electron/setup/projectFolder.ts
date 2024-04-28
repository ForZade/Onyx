const { app } = require('electron');
const fs = require('fs');
const path = require('path');

export function createProjectsFolder() {
    const projectsFolderPath = path.join(app.getPath('userData'), 'Projects');

    if (!fs.existsSync(projectsFolderPath)) {
        fs.mkdirSync(projectsFolderPath);
    }
}