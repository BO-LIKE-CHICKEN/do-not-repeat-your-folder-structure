# Intro

Introduced the Make My Folder feature.

# Features

Make My Folder: Prompt the user for a folder name, then create that folder. Within that folder, the extension also creates `Component.tsx`, `Component.test.tsx`, `styles.ts` and `index.ts` files.

The `Component.tsx` file is automatically populated with React component code based on the given folder name.

```bash
  │── Foo
  │   ├── Foo.test.tsx
  │   ├── Foo.tsx
  │   ├── index.ts
  │   └── styles.ts

```

# Requirements

- This extension requires Visual Studio Code version 1.82.0 or above.

# Extension Settings

There are currently no additional settings options for this extension.

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

**Enjoy the simplicity and efficiency of creating new components with `dryfs`!**

**Enjoy!**
