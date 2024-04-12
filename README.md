# Intro

Introduced the Make My Folder feature.

# Features

- Create a new folder with a predefined set of files including React component, test, styles, and index files.
- Customize the generated folder structure through the VS Code settings.
- Quick and easy generation of folder structures with a single command.

```bash
  │── Foo
  │   ├── Foo.test.tsx
  │   ├── Foo.tsx
  │   ├── index.ts
  │   └── ${styles.ts}

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

## 0.0.1

Introduced the "Make My Folder" feature, which allows users to quickly generate a folder structure for their project. This initial release includes the following capabilities:

- **Make My Folder Feature**: Users can prompt for a folder name, and the extension will create that folder. Inside the created folder, the extension automatically generates `Component.tsx`, `Component.test.tsx`, `styles.ts`, and `index.ts` files.
- **Auto-populated React Component**: The `Component.tsx` file is automatically populated with React component code based on the given folder name, streamlining the process of setting up new components.

For early access to `dryfs`, you can download and install the `dryfs-0.0.1.vsix` file directly:

[Download dryfs-0.0.1.vsix](/dryfs-0.0.1.vsix)

To install the downloaded `.vsix` file:

1. Open Visual Studio Code.
2. Navigate to the Extensions view.
3. Click on the "..." at the top right.
4. Select "Install from VSIX..."
5. Choose the downloaded `dryfs-0.0.1.vsix` file.

# License

This extension is [MIT licensed](LICENSE).

---

**Enjoy the simplicity and efficiency of creating new components with `dryfs`!**
