import { exec } from 'child_process';
import path from 'path';
import shell from 'shelljs';

try {
    shell.exec(`yarn build:clean`);
    shell.exec(`yarn build:cjs`);
    shell.exec(`yarn build:types`);
    shell.cp('-rf', path.join(__dirname, '../src/types/global.d.ts'), path.join(__dirname, '../lib/types/types'));
} catch (error) {
    console.log(error);
}