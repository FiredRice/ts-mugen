import chokidar from 'chokidar';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import shell from 'shelljs';
import path from 'path';
import { getMugenConfig } from '@tsmugen/utils';
import build from './build';

// 将构建好的人物缓存到主程序中
async function toCache(program) {
    const {
        character,
        output,
        cacheName = 'tsmugen_debug'
    } = getMugenConfig();

    const { path: programsPath, version } = program;
    if (!programsPath) return;
    const targetPath = path.join(programsPath, `chars/${cacheName}`);
    try {
        const projectPath = process.cwd();
        const charName = character.name;
        const charPath = path.join(projectPath, `${output}/${version}`);
        await build(version);
        shell.rm('-rf', targetPath);
        shell.cd(programsPath);
        shell.cp('-rf', charPath, targetPath);
        shell.cd(projectPath);
        console.log(`${cacheName}/${charName}/${charName}.def`);
    } catch (error) {
        shell.rm('-rf', targetPath);
    }
}

function rebuild(version: string | undefined, program?: any) {
    return async function () {
        console.log('=============');
        if (program != null && !!program.path) {
            await toCache(program);
        } else {
            await build(version);
        }
    };
}

export default async function dev(version: string | undefined, flags: any) {
    const cache = flags['c'];
    let program;
    try {
        const { rootDir, watchOptions = {}, programs = [] } = getMugenConfig();
        if (cache) {
            if (!programs.length) {
                throw new Error('[No programs]：未找到主程序');
            } else if (version != null) {
                program = programs.find(item => item.version === version);
                if (!program) {
                    throw new Error('[No programs]：未找到主程序');
                }
            } else if (programs.length === 1) {
                program = programs[0];
            } else {
                const answers = await inquirer.prompt({
                    type: 'list',
                    name: 'swtich_program',
                    message: '请选择要目标主程序',
                    choices: programs.map(item => item.name)
                });
                program = programs.find(item => item.name === answers.swtich_program)!;
            }
            // 初始化完成立即构建一次
            await toCache(program);
        }
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
            .on('change', rebuild(version, program))
            .on('error', (error) => {
                console.log('发生了错误：', error);
            });
    } catch (error) {
        console.log(error);
    }
}