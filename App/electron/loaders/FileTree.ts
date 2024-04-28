import { getMainConfig, getProjectPath } from "../handleConfig/getConfig";
const fs = require('fs');
const path = require('path');

interface FileNode {
    id: number;
    name: string;
    type: string;
    path: string;
    children?: FileNode[];
}

let idCounter = 0;
const allowedExtensions = ['.json'];

export function loadFileTree() {
    const mainConfig = getMainConfig();
    const loadedProject = mainConfig?.lastLoaded;
    //@ts-ignore
    const projectPath = getProjectPath(loadedProject);

    if (!projectPath) {
        console.error('Project path not found.');
        return;
    }

    try {
        const fileTree = generateFileTree(projectPath);
        return fileTree.children;
    } catch (error) {
        console.error('Error loading file tree:', error);
    }
}

function generateFileTree(directoryPath: string): FileNode {
    const stats = fs.statSync(directoryPath);
    if (!stats.isDirectory()) {
        throw new Error(`${directoryPath} is not a directory.`);
    }

    const files = fs.readdirSync(directoryPath);

    const fileNode: FileNode = {
        id: idCounter++,
        name: path.basename(directoryPath),
        type: 'dir',
        path: directoryPath,
        children: [],
    };

    files.forEach((file: any) => {
        const filePath = path.join(directoryPath, file);
        const fileStats = fs.statSync(filePath);
        if (fileStats.isDirectory()) {
            const subdirectoryNode = generateFileTree(filePath);
            //@ts-ignore
            fileNode.children.push(subdirectoryNode);
        } else {
            const extension = path.extname(file).toLowerCase();
            if( allowedExtensions.includes(extension)) {
                const fileNameWithoutExtension = path.basename(file, extension);
                const fileItem: FileNode = {
                    id: idCounter++,
                    name: fileNameWithoutExtension,
                    type: extension,
                    path: filePath,
                };
                //@ts-ignore
                fileNode.children.push(fileItem);
            }
        }
    });

    return fileNode;
}