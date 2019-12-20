const vscode = require('vscode');
const getfolders = require('./getfolder')

class BatRunner {


    runCmd(cmdline) {
        var exec = require('child_process').exec;
        exec(`${cmdline}`, function (error, stdout, stderr) {
            if (error) {
                console.error('error: ' + error);
                return;
            }
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
        });
    }

    runBat(path) {
        const { spawn } = require('child_process');
        var folder = getfolders.getCurrentWorkspaceFolder();
        console.log(`${folder}${path}`);
        const bat = spawn('cmd.exe', ['/c', `${folder}${path}`]);


        bat.stdout.on('data', (data) => {
            console.log(data.tostring());
        });

        bat.stderr.on('data', (data) => {
            console.error(data.toString());
        });

        bat.on('exit', (code) => {
            console.log(`exit with code: ${code} `);
        });
    };

    
/*initBat() {
    var projectName = "";
    var projectFolder = getfolders.getCurrentWorkspaceFolder();
    var folder = getfolders.getCurrentWorkspaceFolder() + "/src";
    var files = getfolders.readFolder(folder);
    var batFolder = getfolders.getCurrentWorkspaceFolder() + "/build.bat";
    for (let f in files) {
        var infos = getfolders.readFile(folder + "/" + files[f]);
        var index = infos.indexOf("$dumpfile");
        if (index == -1) {
            continue;
        }
        else {
            while (infos[index++] != "\"");
            while (infos[index] != ".") {
                projectName += infos[index++];
            }
            break;
        }
    }
    getfolders.generateBat(batFolder, this.generateBatString(projectName, projectFolder, files));
};*/


/*
    generateBatString(projectName, workspaceFolder, srcFiles) {
        var files = new Array();
        for (var i = 0; i < srcFiles.length; i++) {
            var temp = workspaceFolder + "src/" + srcFiles[i];
            files.push(temp);
        }
        var batWorkspaceFolder = "";
        for (var i = 0; i < workspaceFolder.length; i++) {
            if (workspaceFolder[i] == '/')
                batWorkspaceFolder += '\\';
            else
                batWorkspaceFolder += workspaceFolder[i];
        }
        var batString = "";
        batString += "@echo off\n";
        batString += "setlocal enabledelayedexpansion\n";
        batString += `cd ${workspaceFolder} \n`;
        batString += `if exist build del /f /s /q ${batWorkspaceFolder}build\\*.*\n`;
        batString += `if not exist build md build\n`;
        batString += "cd build\n\n";

        batString += `iverilog -o ${projectName}`;
        for (var i = 0; i < srcFiles.length; i++) {
            batString += files[i];
            batString += " ";
        }
        batString += `\nvvp -n ${projectName} -lxt2 \n`;
        batString += `move ${projectName}.vcd ${projectName}.lxt\n`;
        batString += `gtkwave ${projectName}.lxt`;

        return batString;
    }
*/
    test() {
        vscode.window.showInformationMessage('Starting generator test.');
    }
}

exports = module.exports = new BatRunner;