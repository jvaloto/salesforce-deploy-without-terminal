import * as vscode from 'vscode';
import { exec } from 'child_process';

export async function execute(filePath: string){
  filePath = filePath.replaceAll('/', '\\');

  let type = getType(filePath);

  if(!type){
    vscode.window.showWarningMessage('This Metadata Type cannot be deployed with this extension');

    return;
  }

  vscode.window.showInformationMessage('Deploying...');

  let fileName = filePath.substring(filePath.lastIndexOf('\\') + 1, filePath.lastIndexOf('.'));

  let command = `sf project deploy start --metadata ${type}:${fileName} --json`;

  exec(command, (error: any, stdout: any, stderr: any) => {
    const outputChannel = vscode.window.createOutputChannel('Deploy Source');

    let result = JSON.parse(stdout);

    if(result.status === 1){
      vscode.window.showErrorMessage('Failed to Deploy');
      
      outputChannel.show();
      
      outputChannel.appendLine('Failed to Deploy:');

      result.result.files.forEach((field: any) =>{
        outputChannel.appendLine('');
        
        outputChannel.appendLine(`${field.fullName}: ${field.error}`);
      });
    }else{
      vscode.window.showInformationMessage('Deployed');
    }
  });
}

function getType(filePath: string){
  if(filePath.indexOf('\\classes\\') > 0){
    return 'ApexClass';
  }else if(filePath.indexOf('\\lwc\\') > 0){
    return 'LightningComponentBundle';
  }else if(filePath.indexOf('\\triggers\\') > 0){
    return 'ApexTrigger';
  }else{
    return null;
  }
}