/*
 * @Date: 2019-09-21 23:45:45
 * @LastEditors: Wang Junbo
 * @LastEditTime: 2019-09-22 20:18:13
 */

const vscode = require('vscode');

module.exports = function (context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.verilogtest', () => {
        vscode.window.showInformationMessage('verilog test!');
    }));
};
