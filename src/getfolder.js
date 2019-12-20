/*
 * @Date: 2019-09-22 23:37:56
 * @LastEditors: Gtylcara.
 * @LastEditTime: 2019-11-29 22:11:12
 */
const vscode = require('vscode');
const fs = require("fs");

class getFolders {
    getCurrentWorkspaceFolder() {
        
        var folder = vscode.workspace.workspaceFolders[0].uri.toString();
        folder = folder.substr(8, folder.length);
        folder += "/";

        var Drive = folder[0];
        folder = folder.substr(4, folder.length);
        folder = Drive + ":" + folder;

        return folder;
    }

    convertOblique(str, flag) {
        if (flag == '/')
        {
            for (const i in str) {
                if (str[i] == '\\')
                    str[i] = '/';
            }
        }
        else if (flag == '\\')
        {
            for (const i in str) {
                if (str[i] == '/')
                    str[i] = '\\';
            }
        }
        return str;
    }

    readFolder(path) {
        return fs.readdirSync(path);
    };


    readFile(path) {
        return fs.readFileSync(path, 'utf8');
    }

    fileExists(path) {
        fs.existsSync(path);
    }

    deleteFile(path) {
        fs.unlinkSync(path);
    }

    generateBat(path, data) {
        fs.writeFileSync(path, data);
    }

}
exports = module.exports = new getFolders;