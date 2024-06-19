import * as vscode from "vscode";
import * as fs from "fs/promises";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "dryfs.makeMyFolder",
    async (uri: vscode.Uri) => {
      try {
        const moduleName = await vscode.window.showInputBox({
          prompt: "Enter the module name",
        });

        if (!moduleName) {
          return;
        }

        const folderPath = (await fs.lstat(uri.fsPath)).isDirectory()
          ? uri.fsPath
          : path.dirname(uri.fsPath);

        const rootPath = vscode.workspace.rootPath;
        if (!rootPath) {
          vscode.window.showErrorMessage("Workspace root path not found");
          return;
        }

        const configPath = path.join(rootPath, "dryfs.json");
        const configExists = await fs.stat(configPath).catch(() => false);
        if (!configExists) {
          vscode.window.showErrorMessage(
            "dryfs.json configuration file not found in project root"
          );
          return;
        }

        const config = JSON.parse(await fs.readFile(configPath, "utf-8"));
        const templateConfig = config.rootFolder;

        const newFolderPath = path.join(folderPath, moduleName);
        if (!(await fs.stat(newFolderPath).catch(() => false))) {
          await fs.mkdir(newFolderPath);
        }

        await createFoldersAndFiles(newFolderPath, templateConfig, moduleName);

        vscode.window.showInformationMessage(
          "Folder and files created successfully!"
        );
      } catch (error) {
        vscode.window.showErrorMessage(
          `Error creating folder and files: ${error.message}`
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

async function createFoldersAndFiles(
  basePath: string,
  config: any,
  moduleName: string
) {
  const createFolder = async (folderPath: string) => {
    if (!(await fs.stat(folderPath).catch(() => false))) {
      await fs.mkdir(folderPath);
    }
  };

  const processFolders = async (base: string, folders: any[]) => {
    for (const folder of folders) {
      const folderPath = path.join(
        base,
        folder.name.replace("{moduleName}", moduleName)
      );
      await createFolder(folderPath);
      if (folder.folders) {
        await processFolders(folderPath, folder.folders);
      }
      if (folder.files) {
        await processFiles(folderPath, folder.files, moduleName);
      }
    }
  };

  const processFiles = async (
    base: string,
    files: any[],
    moduleName: string
  ) => {
    for (const file of files) {
      const fileName = file.name.replace("{moduleName}", moduleName);
      const content = file.content
        ? file.content.replace(/{moduleName}/g, moduleName)
        : "";
      await createFile(base, fileName, content);
    }
  };

  await processFolders(basePath, config.folders);
  await processFiles(basePath, config.files, moduleName);
}

async function createFile(
  folderPath: string,
  fileName: string,
  content: string
) {
  const filePath = path.join(folderPath, fileName);
  await fs.writeFile(filePath, content);
}

export function deactivate() {}
