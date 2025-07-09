import * as vscode from 'vscode';
import { execute } from './functions';

export function activate(context: vscode.ExtensionContext){
	context.subscriptions.push(
		vscode.commands.registerCommand('dwt.deploy', () =>{
			const editor = vscode.window.activeTextEditor;

			if(editor){
				execute(editor.document.fileName);
			}
		})
	);
}

export function deactivate(){ }