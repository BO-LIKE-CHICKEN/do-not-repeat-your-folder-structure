# Intro

Introduced the Make My Folder feature.

# Features

- Create a new folder with a predefined set of files including React component, test, styles, and index files.
- Customize the generated folder structure through the VS Code settings.
- Quick and easy generation of folder structures with a single command.

# Usage

To use the `Make My Folder` feature in your VS Code environment, follow these simple steps:

## 1. **Right-click** on the folder in the VS Code Explorer where you want to create your new component structure.

![usage_1](/images/usage_1.png)

## 2. Select **`Make My Folder`** from the context menu.

## 3. You will be prompted to enter the **name of your new folder**. Type the desired name and press **Enter**.

![usage_2](/images/usage_2.png)

## 4. The extension will automatically generate a new folder with the specified name and the predefined set of files:

![usage_3](/images/usage_3.png)

- `${FolderName}.tsx` for your React component
- `${FolderName}.test.tsx` for your component's test
- `index.ts` for easy exports
- `${styles.ts}` for component styling, which can be renamed based on your settings

The file and folder names will be automatically replaced with the name you provide, and the files will be customized according to the extension settings you've configured.

For example, if you input "Bar" as the folder name, here is what will be created:

```bash
│── Bar
│   ├── Bar.test.tsx
│   ├── Bar.tsx
│   ├── index.ts
│   └── styles.ts  # or whatever filename is configured in the settings
```

# Requirements

- This extension requires Visual Studio Code version 1.82.0 or above.

# Extension Settings

This extension contributes the following settings:

- `dryfs.stylesFilename`: set the filename for the styles file (default `styles.ts`).
- `dryfs.includeReactImport`: include the React import statement in component templates (default `false`).

```json
{
  "dryfs.stylesFilename": "styles.css.ts",
  "dryfs.includeReactImport": true
}
```

# Contributing

If you'd like to contribute to the development of DRYFS, please create a pull request or raise an issue on the repository.

# Known Issues

No known issues at the moment.

# Release Notes

## 1.0.0

Introduced the "Make My Folder" feature, which allows users to quickly generate a folder structure for their project.

## 1.0.1

Added detailed usage instructions to the README.md to enhance user understanding and ease of use.

# License

This extension is [MIT licensed](LICENSE).

---

**Enjoy the simplicity and efficiency of creating new components with `dryfs`!**
