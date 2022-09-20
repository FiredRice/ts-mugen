import shell from 'shelljs';

try {
    shell.exec(`rimraf lib`);
    shell.exec(`tsc --project tsconfig.prod.cjs.json`);
} catch (error) {
    console.log(error);
}