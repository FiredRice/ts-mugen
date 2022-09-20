import shell from 'shelljs';
import path from 'path';
import { getMugenConfig } from '@tsmugen/utils';

export default async function clean(version?: string) {
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