import shell from 'shelljs';

const config = require(`${process.cwd()}/tsmugen.config.js`);

try {
    const version = process.argv.slice(2)[0];
    const rootPath = config.output || 'lib';
    if (version) {
        shell.exec(`rimraf ${rootPath}/${version}`);
        process.env['mugen_version'] = version;
        shell.exec(`ts-node ${config.entry}`);
    } else {
        shell.exec(`rimraf ${rootPath}`);
        process.env['mugen_version'] = '1.0';
        shell.exec(`ts-node ${config.entry}`);
        process.env['mugen_version'] = '1.1';
        shell.exec(`ts-node ${config.entry}`);
    }
} catch (error) {
    console.log(error);
}
