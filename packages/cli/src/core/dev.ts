import chokidar from 'chokidar';
import fs from 'fs-extra';
import { getMugenConfig } from '@tsmugen/utils';
import build from './build';

function rebuild(version?: string) {
    return async function () {
        await build(version);
    };
}

export default async function dev(version?: string) {
    try {
        const { rootDir, watchOptions = {} } = getMugenConfig();
        chokidar
            .watch([rootDir, 'tsmugen.config.js'], {
                ignored: testpath => {
                    if (fs.existsSync(testpath) && fs.statSync(testpath).isFile()) {
                        // rootDir 下的非 ts 文件不做监听
                        return testpath.includes('tsmugen.config.js') ? false : /^.*?(?<!\.ts)$/.test(testpath);
                    }
                    return false;
                },
                ...watchOptions
            })
            .on('ready', function () {
                console.log('开始监听');
            })
            .on('change', rebuild(version))
            .on('error', (error) => {
                console.log('发生了错误：', error);
            });
    } catch (error) {
        console.log(error);
    }
}