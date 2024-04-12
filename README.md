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

## 1.0.0

Introduced the "Make My Folder" feature, which allows users to quickly generate a folder structure for their project.

# License

This extension is [MIT licensed](LICENSE).

---

**Enjoy the simplicity and efficiency of creating new components with `dryfs`!**
g
