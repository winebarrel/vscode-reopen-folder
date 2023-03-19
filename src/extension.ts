import * as vscode from "vscode";

function reopenParent(uri: any) {
  if (!(uri instanceof vscode.Uri)) {
    return;
  }

  const wsFolder = vscode.workspace.getWorkspaceFolder(uri);

  if (!wsFolder) {
    return;
  }

  const parent = vscode.Uri.joinPath(wsFolder.uri, "..");
  vscode.commands.executeCommand("vscode.openFolder", parent, false);
}

function openFolder(uri: any, forceNewWindow: boolean) {
  if (!(uri instanceof vscode.Uri)) {
    return;
  }

  vscode.commands.executeCommand("vscode.openFolder", uri, forceNewWindow);
}

function reopenFolderInPrompt() {
  vscode.window
    .showInputBox({
      placeHolder: "path/to/dir",
    })
    .then((path: string | undefined) => {
      if (!path) {
        return;
      }

      let uri = vscode.Uri.file(path);

      if (!path.startsWith("/")) {
        if (!vscode.workspace.workspaceFolders) {
          return;
        }

        const root = vscode.workspace.workspaceFolders[0];

        if (!root) {
          return;
        }

        uri = vscode.Uri.joinPath(root.uri, path);
      }

      vscode.commands.executeCommand("vscode.openFolder", uri, false);
    });
}

export function activate(context: vscode.ExtensionContext) {
  const disposableReopenParent = vscode.commands.registerCommand(
    "reopen-folder.reopenParent",
    reopenParent
  );

  context.subscriptions.push(disposableReopenParent);

  const disposableReopenFolder = vscode.commands.registerCommand(
    "reopen-folder.reopenFolder",
    (uri: any) => openFolder(uri, false)
  );

  context.subscriptions.push(disposableReopenFolder);

  const disposableOpenFolder = vscode.commands.registerCommand(
    "reopen-folder.openFolder",
    (uri: any) => openFolder(uri, false)
  );

  context.subscriptions.push(disposableOpenFolder);

  const disposableReopenFolderInPrompt = vscode.commands.registerCommand(
    "reopen-folder.reopenFolderInPrompt",
    reopenFolderInPrompt
  );

  context.subscriptions.push(disposableReopenFolder);
}

export function deactivate() {}
