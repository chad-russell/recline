import { start } from "repl";
import * as vscode from "vscode";

class ReclineCodeLensProvider implements vscode.CodeLensProvider {
  constructor() {}

  provideCodeLenses(
    document: vscode.TextDocument,
    token: vscode.CancellationToken,
  ): vscode.ProviderResult<vscode.CodeLens[]> {
    console.log("wooooo, doing it!");

    let lenses: Array<vscode.CodeLens> = [];

    for (let lineNum = 0; lineNum < document.lineCount; lineNum++) {
      let line = document.lineAt(lineNum);
      if (!line.isEmptyOrWhitespace) {
        let location = new vscode.Range(lineNum, 0, lineNum, 0);

        let command: vscode.Command = {
          title: "▷ Send",
          command: "recline.sayHello",
          arguments: [line.text],
        };

        lenses.push(
          new vscode.CodeLens(
            location,
            command,
          ),
        );
      }
    }

    return lenses;
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "recline" is now active!');

  let commandDisposable = vscode.commands.registerCommand(
    "recline.sayHello",
    (g) => {
      vscode.window.showInformationMessage(`Hello! ${g}`);
    },
  );
  context.subscriptions.push(commandDisposable);

  let docSelector = {
    scheme: "file",
  };
  let codeLensProviderDisposable = vscode.languages.registerCodeLensProvider(
    docSelector,
    new ReclineCodeLensProvider(),
  );
  context.subscriptions.push(codeLensProviderDisposable);
}

export function deactivate() {}
