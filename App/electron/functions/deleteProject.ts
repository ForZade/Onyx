import { app } from "electron";
import { selectProject } from "../updaters/updateMainConfig";

const fs = require('fs');
const path = require('path');

export function deleteProject(project: string) {
    selectProject('');

    const projectPath = path.join(app.getAppPath(), 'projects', project);

    // Function to delete directory recursively
    const deleteDirectory = (directoryPath: string) => {
        // Read directory contents
        fs.readdir(directoryPath, (err: any, files: any) => {
            if (err) {
                console.error('Error reading project directory:', err);
                return;
            }
            
            // Delete each file or subdirectory within the directory
            files.forEach((file: any) => {
                const filePath = path.join(directoryPath, file);
                
                // Check if it's a directory
                if (fs.statSync(filePath).isDirectory()) {
                    // Recursively delete subdirectory
                    deleteDirectory(filePath);
                } else {
                    // Delete file
                    fs.unlinkSync(filePath);
                }
            });
            
            // After all contents have been deleted, remove the empty directory
            fs.rmdir(directoryPath, (err: any) => {
                if (err) {
                    console.error('Error deleting project directory:', err);
                    return;
                }
                console.log('Project directory deleted successfully.');
            });
        });
    };

    // Call the function to delete the project directory
    deleteDirectory(projectPath);
}
