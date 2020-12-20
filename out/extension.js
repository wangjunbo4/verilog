"use strict";
/*
 * @Author: Gtylcara.
 * @Date: 2020-11-17 23:07:19
 * @LastEditors: Gtylcara.
 * @LastEditTime: 2020-11-24 10:40:49
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const builder_1 = require("./builder");
function activate(context) {
    let builder = new builder_1.Builder();
    let disposable = vscode.commands.registerCommand('extension.build', () => {
        builder.build();
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('extension.simulate', () => {
        builder.simulate();
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map