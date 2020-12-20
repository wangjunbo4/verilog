"use strict";
/*
 * @Author: Gtylcara.
 * @Date: 2020-11-17 23:45:40
 * @LastEditors: Gtylcara.
 * @LastEditTime: 2020-11-24 15:56:34
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = void 0;
const vscode = require("vscode");
const fs = require("fs-extra");
class Builder {
    constructor() {
        this.buildFolder = "";
        this.sourceFolder = "";
        this.sourceFiles = [""];
        this.projectName = "";
        this.compileFiles = "";
        this.rootFolder = "";
        this.buildFolderName = "build";
        this.sourceFolderName = "src";
    }
    initRootInfo() {
        return new Promise(resolve => {
            let rootInfo;
            vscode.window.showWorkspaceFolderPick().then(value => {
                if (value === undefined) {
                    vscode.window.showErrorMessage("Selecting workspace folder failed.");
                    return;
                }
                //vscode.window.showInformationMessage(value.uri.fsPath);
                rootInfo = value.uri.fsPath;
                resolve(rootInfo);
            });
        });
    }
    build() {
        this.initRootInfo().then(resolve => {
            this.rootFolder = resolve;
            if (this.rootFolder === undefined) {
                vscode.window.showErrorMessage("Root folder undefined.");
                return;
            }
            this.buildFolder = `${this.rootFolder}\\${this.buildFolderName}`;
            this.sourceFolder = `${this.rootFolder}\\${this.sourceFolderName}`;
            this.sourceFiles = [""];
            this.projectName = "";
            this.compileFiles = `${this.projectName} `;
            // vscode.window.showInformationMessage("Build folder: " + this.buildFolder);
        }).then(resolve => {
            if (this.buildFolder === undefined) {
                vscode.window.showErrorMessage("BuildFolder undefined.");
                return;
            }
            this.terminal = vscode.window.terminals[0];
            this.terminal.sendText(`cd ${this.rootFolder}`);
            this.terminal.sendText(`if exist "${this.buildFolder}" del /f /s /q "${this.convertOblique(this.buildFolder, "/")}\\*.*"`);
            this.terminal.sendText(`if not exist "${this.buildFolder}" md "${this.buildFolder}"`);
            if (this.sourceFolder === undefined) {
                vscode.window.showErrorMessage("Source Folder undefined.");
                return;
            }
            this.sourceFiles = fs.readdirSync(this.sourceFolder, "utf8");
            if (this.sourceFiles === undefined || this.sourceFiles.length < 1) {
                vscode.window.showErrorMessage('No Source File Found');
                return;
            }
            for (let f of this.sourceFiles) {
                // vscode.window.showInformationMessage(f);
                let infos;
                infos = fs.readFileSync(this.sourceFolder + "/" + f, "utf-8");
                let index = infos.indexOf("$dumpfile");
                if (index == -1) {
                    continue;
                }
                else {
                    while (infos[index++] !== "\"")
                        ;
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
            for (let i = 0; i < this.sourceFiles.length; i++) {
                this.compileFiles += `${this.sourceFolder}/${this.sourceFiles[i]}`;
                this.compileFiles += " ";
            }
            this.terminal.sendText(`iverilog -o ${this.buildFolder}/${this.projectName} ${this.compileFiles}`);
            vscode.window.showInformationMessage("Build complete");
            this.terminal.sendText(`cd ${this.buildFolder} && vvp -n ${this.buildFolder}/${this.projectName} -lxt2`);
            this.terminal.sendText(`cd ${this.buildFolder} && gtkwave ${this.projectName}.vcd`);
        });
    }
    simulate() {
        if (this.terminal === undefined)
            return;
        this.terminal.sendText(`cd ${this.buildFolder} && vvp -n ${this.buildFolder}/${this.projectName} -lxt2`);
        this.terminal.sendText(`cd ${this.buildFolder} && gtkwave ${this.projectName}.vcd`);
    }
    convertOblique(str, flag) {
        if (flag == '/') {
            for (let i of str) {
                if (i == '\\')
                    i = '/';
            }
        }
        else if (flag == '\\') {
            for (let i of str) {
                if (i == '/')
                    i = '\\';
            }
        }
        return str;
    }
}
exports.Builder = Builder;
//# sourceMappingURL=builder.js.map