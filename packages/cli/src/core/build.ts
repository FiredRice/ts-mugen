import clean from './clean';
import shell from 'shelljs';
import { getMugenConfig } from '@tsmugen/utils';

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