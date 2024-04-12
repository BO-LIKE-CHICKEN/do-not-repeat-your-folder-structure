import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import {
  generateComponentTemplate,
  generateImportReactComponentTemplate,
  generateIndexTemplate,
} from "./template";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "dryfs.makeMyFolder",
    async (uri: vscode.Uri) => {
      const folderPath = fs.lstatSync(uri.fsPath).isDirectory()
        ? uri.fsPath
        : path.dirname(uri.fsPath);

      const config = vscode.workspace.getConfiguration("dryfs");

      const stylesFilename =
        config.get<string>("stylesFilename") ?? "styles.ts";

      const isIncludeReactImport = config.get<boolean>("includeReactImport");

      const folderName = await vscode.window.showInputBox({
        prompt: "Enter the folder name",
      });

      if (!folderName) {
        return;
      }

      const newFolderPath = path.join(folderPath, folderName);
      if (!fs.existsSync(newFolderPath)) {
        fs.mkdirSync(newFolderPath);
      }

      const componentTemplate = isIncludeReactImport
        ? generateImportReactComponentTemplate(folderName)
        : generateComponentTemplate(folderName);

      fs.writeFileSync(
        path.join(newFolderPath, `${folderName}.tsx`),
        componentTemplate
      );

      const indexTemplate = generateIndexTemplate(folderName);

      fs.writeFileSync(path.join(newFolderPath, "index.ts"), indexTemplate);
      fs.writeFileSync(path.join(newFolderPath, stylesFilename), "");
      fs.writeFileSync(path.join(newFolderPath, `${folderName}.test.tsx`), "");

      vscode.window.showInformationMessage(
        "Folder and files created successfully!"
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
