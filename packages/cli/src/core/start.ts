import shell from 'shelljs';
import inquirer from 'inquirer';
import path from 'path';
import { getMugenConfig } from '@tsmugen/utils';
import build from './build';

const {
    character,
    output,
    programs = [],
    cacheName = 'tsmugen_debug'
} = getMugenConfig();

async function run(program) {
    const { path: programsPath, version } = program;
    const charPath = path.join(process.cwd(), `${output}/${version}`);
    await build(version);
    const charName = character.name;
    const targetPath = `${programsPath}/chars/${cacheName}`;
    const name = `${cacheName}/${charName}/${charName}.def`;
    try {
        shell.cd(programsPath);
        shell.cp('-rf', charPath, targetPath);
        shell.exec(`mugen -p1 ${name} -p2 ${name}`);
        shell.rm('-rf', targetPath);
    } catch (error) {
        shell.rm('-rf', targetPath);
    }
}

export default async function start() {
    try {
        if (!programs.length) {
            throw new Error('[No programs]：未找到主程序');
        } else if (programs.length === 1) {
            run(programs[0]);
        } else {
            const answers = await inquirer.prompt({
                type: 'list',
                name: 'swtich_program',
                message: '请选择要运行的主程序',
                choices: programs.map(item => item.name)
            });
            const program = programs.find(item => item.name === answers.swtich_program)!;
            run(program);
        }
    } catch (error) {
        console.log(error);
    }
}