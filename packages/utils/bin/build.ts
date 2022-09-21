import { exec } from 'child_process';
import shell from 'shelljs';

function childExec(command: string) {
    console.log(command);
    exec(command);
}

try {
    shell.exec(`yarn build:clean`);
    childExec(`yarn build:es2015`);
    childExec(`yarn build:cjs`);
    childExec(`yarn build:types`);
    shell.exec(`yarn build:esm5`);
    shell.exec(`yarn build:umd`);
} catch (error) {
    console.log(error);
}