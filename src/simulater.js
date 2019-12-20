const vscode = require('vscode');
const builder = require('./builder');

module.exports = function (context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.simulate', () => {
        builder.simulate();
    }));
};