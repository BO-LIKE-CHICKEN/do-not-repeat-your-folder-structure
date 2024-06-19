import * as vscode from "vscode";
import * as fs from "fs/promises";
import * as path from "path";

/**
 * This function is called when your extension is activated.
 * It registers a command "dryfs.makeMyFolder" that creates a new module folder structure
 * based on the template defined in a configuration file (dryfs.json) located in the workspace root.
 *
 * @param context - The context in which the extension is run, provided by VSCode.
 */
export function activate(context: vscode.ExtensionContext) {
  // Registering the command.
  const disposable = vscode.commands.registerCommand(
    "dryfs.makeMyFolder",
    async (uri: vscode.Uri) => {
      try {
        // Prompting the user to input the module name.
        const moduleName = await getModuleName();
        if (!moduleName) {
          return;
        }

        // Getting the root path of the workspace.
        const rootPath = getRootPath();

        if (!rootPath) {
          return;
        }

        // Setting the path to the dryfs.json configuration file.
        const configPath = path.join(rootPath, "dryfs.json");

        // Checking if the configuration file exists.
        if (!(await fileExists(configPath))) {
          vscode.window.showErrorMessage(
            "dryfs.json configuration file not found in project root"
          );
          return;
        }

        // Getting the folder path from the URI.
        const folderPath = await getFolderPath(uri);

        // Reading the configuration file.
        const config = await getConfig(configPath);
        const templateConfig = config.rootFolder;

        // Setting the path for the new folder.
        const newFolderPath = path.join(folderPath, moduleName);

        // Creating the new folder if it doesn't exist.
        await createFolderIfNotExists(newFolderPath);

        // Creating folders and files based on the configuration.
        await createFoldersAndFiles(newFolderPath, templateConfig, moduleName);

        vscode.window.showInformationMessage(
          "Folder and files created successfully!"
        );
      } catch (error: unknown) {
        if (error instanceof Error) {
          vscode.window.showErrorMessage(
            `Error creating folder and files: ${error.message}`
          );
          return;
        }

        vscode.window.showErrorMessage(
          `Unknown error occurred while creating folder and files`
        );
      }
    }
  );

  // Adding the command to the context's subscriptions.
  context.subscriptions.push(disposable);
}

export function deactivate() {}

/** Function to prompt the user to input the module name. */
async function getModuleName(): Promise<string | undefined> {
  return vscode.window.showInputBox({ prompt: "Enter the module name" });
}

/**  Function to get the folder path from the URI. */
async function getFolderPath(uri: vscode.Uri): Promise<string> {
  const stat = await fs.lstat(uri.fsPath);
  return stat.isDirectory() ? uri.fsPath : path.dirname(uri.fsPath);
}

/** Function to get the root path of the workspace. */
function getRootPath(): string | undefined {
  const rootPath = vscode.workspace.rootPath;
  if (!rootPath) {
    vscode.window.showErrorMessage("Workspace root path not found");
  }
  return rootPath;
}

/** Function to check if a file exists. */
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.stat(filePath);
    return true;
  } catch {
    return false;
  }
}

/** Function to read and parse the configuration file. */
async function getConfig(configPath: string): Promise<any> {
  const configFile = await fs.readFile(configPath, "utf-8");
  return JSON.parse(configFile);
}

/** Function to create a folder if it doesn't exist. */
async function createFolderIfNotExists(folderPath: string) {
  if (!(await fileExists(folderPath))) {
    await fs.mkdir(folderPath);
  }
}

/** Function to create folders and files based on the configuration. */
async function createFoldersAndFiles(
  basePath: string,
  config: any,
  moduleName: string
) {
  async function createFolder(folderPath: string) {
    if (!(await fileExists(folderPath))) {
      await fs.mkdir(folderPath);
    }
  }

  async function processFolders(base: string, folders: any[]) {
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
  }

  async function processFiles(base: string, files: any[], moduleName: string) {
    for (const file of files) {
      const fileName = file.name.replace("{moduleName}", moduleName);
      const content = file.content
        ? file.content.replace(/{moduleName}/g, moduleName)
        : "";
      await createFile(base, fileName, content);
    }
  }

  await processFolders(basePath, config.folders);
  await processFiles(basePath, config.files, moduleName);
}

/** Function to create a file. */
async function createFile(
  folderPath: string,
  fileName: string,
  content: string
) {
  const filePath = path.join(folderPath, fileName);
  await fs.writeFile(filePath, content);
}
