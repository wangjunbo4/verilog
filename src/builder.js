const vscode = require('vscode');
const batRunner = require('./batRunner');
const getFolder = require('./getfolder');

class Builder
{
    
    constructor()
    {
        this.buildFolder = "";
        this.sourceFolder = "";
        this.sourceFiles = [""];
        this.projectName = "";
        this.compileFiles = "";
    }

    initBuildInfo()
    {
        this.buildFolder = `${getFolder.getCurrentWorkspaceFolder()}build`;
        this.sourceFolder = `${getFolder.getCurrentWorkspaceFolder()}src`;
        this.sourceFiles = getFolder.readFolder(this.sourceFolder);
        this.projectName = "";
        this.compileFiles = `${this.projectName} `;
    }

    build()
    {
        this.initBuildInfo();

        batRunner.runCmd(`if exist ${this.buildFolder} del /f /s /q "${getFolder.convertOblique(getFolder.getCurrentWorkspaceFolder())}build\\*.*"`);
        batRunner.runCmd(`if not exist ${this.buildFolder} md "${this.buildFolder}"`);

        

        if (this.sourceFiles == "") {
            vscode.window.showErrorMessage('No Source File Found');
            return;
        }

        for (let f in this.sourceFiles) {
            var infos = getFolder.readFile(this.sourceFolder + "/" + this.sourceFiles[f]);
            var index = infos.indexOf("$dumpfile");
            if (index == -1) {
                continue;
            }
            else {
                while (infos[index++] != "\"");
                while (infos[index] != ".") {
                    this.projectName += infos[index++];
                }
                break;
            }
        }

        if (this.projectName == "") {
            vscode.window.showErrorMessage(`No Project Name Found`);
            return;
        }

        for (var i = 0; i < this.sourceFiles.length; i++) {
            this.compileFiles += `${this.sourceFolder}/${this.sourceFiles[i]}`;
            this.compileFiles += " ";
        }

        
        console.log(this.compileFiles);
        batRunner.runCmd(`iverilog -o ${this.compileFiles}`);
        batRunner.runCmd(`vvp -n ${this.projectName} -lxt2`);
        batRunner.runCmd(`move ${this.projectName}.vcd ${this.projectName}.lxt`);
        batRunner.runCmd(`gtkwave ${this.projectName}.lxt`);

        vscode.window.showInformationMessage('Starting Generate');
    }
}

exports = module.exports = new Builder;
