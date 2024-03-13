import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { generateComponentTemplate, generateIndexTemplate } from "./template";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "dryfs.makeMyFolder",
    (uri: vscode.Uri) => {
      const folderPath = fs.lstatSync(uri.fsPath).isDirectory()
        ? uri.fsPath
        : path.dirname(uri.fsPath);

      // 사용자로부터 폴더 이름을 입력 받음
      vscode.window
        .showInputBox({ prompt: "Enter the folder name" })
        .then((folderName) => {
          if (folderName) {
            const newFolderPath = path.join(folderPath, folderName);

            // 폴더 생성
            if (!fs.existsSync(newFolderPath)) {
              fs.mkdirSync(newFolderPath);
            }

            // ${folderName}.tsx 파일에 React 컴포넌트 코드 작성
            const componentTemplate = generateComponentTemplate(folderName);

            fs.writeFileSync(
              path.join(newFolderPath, `${folderName}.tsx`),
              componentTemplate
            );

            const indexTemplate = generateIndexTemplate(folderName);
            // index.ts 파일에서 React 컴포넌트 export
            fs.writeFileSync(
              path.join(newFolderPath, "index.ts"),
              indexTemplate
            );

            // styles.ts 파일 생성
            fs.writeFileSync(path.join(newFolderPath, "styles.ts"), "");

            // ${folderName}.test.tsx 파일 생성
            fs.writeFileSync(
              path.join(newFolderPath, `${folderName}.test.tsx`),
              ""
            );

            vscode.window.showInformationMessage(
              "Folder and files created successfully!"
            );
          }
        });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
