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

function reopenFolder(uri: any) {
  if (!(uri instanceof vscode.Uri)) {
    return;
  }

  vscode.commands.executeCommand("vscode.openFolder", uri, false);
}

export function activate(context: vscode.ExtensionContext) {
  const disposableReopenParent = vscode.commands.registerCommand(
    "reopen-folder.reopenParent",
    reopenParent
  );

  context.subscriptions.push(disposableReopenParent);

  const disposableReopenFolder = vscode.commands.registerCommand(
    "reopen-folder.reopenFolder",
    reopenFolder
  );

  context.subscriptions.push(disposableReopenFolder);
}

export function deactivate() {}
