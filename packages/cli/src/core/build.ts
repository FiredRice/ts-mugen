import shell from 'shelljs';
import path from 'path';
import { getMugenConfig } from '@tsmugen/utils';

async function clean(version?: string) {
    try {
        const { output } = getMugenConfig();
        const rootPath = output || 'lib';
        if (version) {
            if (['1.0', '1.1'].includes(version)) {
                shell.rm('-rf', path.join(process.cwd(), rootPath, version));
            } else {
                throw new Error('版本号只能为 1.0 或 1.1');
            }
        } else {
            shell.rm('-rf', path.join(process.cwd(), rootPath));
        }
    } catch (error) {
        console.log(error);
    }
}

export default async function build(version?: string) {
    try {
        const config = getMugenConfig();
        if (version) {
            await clean(version);
            process.env['mugen_version'] = version;
            shell.exec(`ts-node ${config.entry}`);
        } else {
            await clean(version);
            process.env['mugen_version'] = '1.0';
            shell.exec(`ts-node ${config.entry}`);
            process.env['mugen_version'] = '1.1';
            shell.exec(`ts-node ${config.entry}`);
        }
    } catch (error) {
        console.log(error);
    }
}