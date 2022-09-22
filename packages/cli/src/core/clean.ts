import shell from 'shelljs';
import { getMugenConfig } from '@tsmugen/utils';

export default async function clean() {
    try {
        const { cacheName = 'tsmugen_debug', programs = [] } = getMugenConfig();
        for (const program of programs) {
            if (program.path) {
                shell.rm('-rf', `${program.path}/chars/${cacheName}`);
            }
        }
    } catch (error) {
        console.log(error);
    }
}