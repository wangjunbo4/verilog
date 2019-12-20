/*
 * @Date: 2019-09-21 22:50:56
 * @LastEditors: Gtylcara.
 * @LastEditTime: 2019-11-29 22:15:15
 */

const vscode = require('vscode');
const builder = require('./builder');


module.exports = function (context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.generate', () => {
        builder.build();
    }));
};