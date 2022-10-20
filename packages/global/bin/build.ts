import { exec } from 'child_process';
import path from 'path';
import shell from 'shelljs';

function childExec(command: string) {
    console.log(command);
    exec(command);
}

try {
    shell.exec(`yarn build:clean`);
    childExec(`yarn build:cjs`);
    // shell.cp('-rf', path.join(__dirname, '../types/index.ts'), path.join(__dirname, '../types/index.ts'));
    childExec(`yarn build:types`);
} catch (error) {
    console.log(error);
}