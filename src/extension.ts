/*
 * @Author: Gtylcara.
 * @Date: 2020-11-17 23:07:19
 * @LastEditors: Gtylcara.
 * @LastEditTime: 2020-11-24 10:40:49
 */

import * as vscode from 'vscode';
import { Builder } from './builder';

export function activate(context: vscode.ExtensionContext) {

    let builder = new Builder();

    let disposable = vscode.commands.registerCommand('extension.build', () => {

        builder.build();

    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('extension.simulate', () => {

        builder.simulate();

    });
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
