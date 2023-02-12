import * as vscode from 'vscode';

import { formatXMLString } from 'better-xml-formatter';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "constrained-xml-formatter" is now active!');
	let disposable = vscode.commands.registerCommand('constrained-xml-formatter.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from constrained-xml-formatter!');
	});
	vscode.languages.registerDocumentFormattingEditProvider('xml', {
		provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
			const getTabSize = vscode.workspace.getConfiguration().get("editor.tabSize");
			const tabSize = typeof getTabSize === 'number' ? getTabSize : 2;
			const text = document.getText();
			const { formatted, message } = formatXMLString(text, tabSize, 80);
			vscode.window.showInformationMessage(formatted || message);
			return [
				vscode
					.TextEdit
					.replace(
						new vscode.Range(
							document.lineAt(0).range.start,
							document.lineAt(document.lineCount - 1).range.end
						), formatted || text)
			];
		}
	});
	context.subscriptions.push(disposable);
}
export function deactivate() { }
