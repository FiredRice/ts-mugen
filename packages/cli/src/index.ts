#!/usr/bin/env node
import { program } from 'commander';
import start from './core/start';

const { version } = require('../package.json');

program
    .name('tsmugen')
    .usage('<command> [options]')
    .version(version, '-v, --version', '输出版本号');

program
    .command('create <project-name>')
    .description('创建 ts-mugen 项目')
    .action(async (name: string) => {
        console.log(name);
    });

program
    .command('start')
    .description('开始调试')
    .action(start);

program.parse(process.argv);