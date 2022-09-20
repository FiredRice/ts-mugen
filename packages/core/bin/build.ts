import shell from 'shelljs';

try {
    shell.exec(`yarn build:clean`);
    shell.exec(`yarn build:es2015`);
    shell.exec(`yarn build:esm5`);
    shell.exec(`yarn build:cjs`);
    shell.exec(`yarn build:types`);
    shell.exec(`yarn build:umd`);
} catch (error) {
    console.log(error);
}