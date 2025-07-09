"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const vscode = __importStar(require("vscode"));
const child_process_1 = require("child_process");
async function execute(filePath) {
    filePath = filePath.replaceAll('/', '\\');
    let type = getType(filePath);
    if (!type) {
        vscode.window.showWarningMessage('This Metadata Type cannot be deployed with this extension');
        return;
    }
    vscode.window.showInformationMessage('Deploying...');
    let fileName = filePath.substring(filePath.lastIndexOf('\\') + 1, filePath.lastIndexOf('.'));
    let command = `sf project deploy start --metadata ${type}:${fileName} --json`;
    (0, child_process_1.exec)(command, (error, stdout, stderr) => {
        const outputChannel = vscode.window.createOutputChannel('Deploy Source');
        let result = JSON.parse(stdout);
        if (result.status === 1) {
            vscode.window.showErrorMessage('Failed to Deploy');
            outputChannel.show();
            outputChannel.appendLine('Failed to Deploy:');
            result.result.files.forEach((field) => {
                outputChannel.appendLine('');
                outputChannel.appendLine(`${field.fullName}: ${field.error}`);
            });
        }
        else {
            vscode.window.showInformationMessage('Deployed');
        }
    });
}
function getType(filePath) {
    if (filePath.indexOf('\\classes\\') > 0) {
        return 'ApexClass';
    }
    else if (filePath.indexOf('\\lwc\\') > 0) {
        return 'LightningComponentBundle';
    }
    else if (filePath.indexOf('\\triggers\\') > 0) {
        return 'ApexTrigger';
    }
    else {
        return null;
    }
}
//# sourceMappingURL=functions.js.map