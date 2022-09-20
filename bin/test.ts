import shell from 'shelljs';

shell.exec(`yarn build:cli`);
shell.exec(`yarn link`);
shell.exec(`yarn test:cli`);