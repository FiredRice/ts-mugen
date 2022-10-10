#!/usr/bin/env node
import { program } from 'commander';
import init from './core/init';

const { version } = require('../package.json');

program
    .name('create-tsmugen-app')
    .usage('<command> [options]')
    .version(version, '-v, --version', '输出版本号');

program
    .command('init <project-name>')
    .description('初始化 ts-mugen 项目')
    .action(init);

program.parse(process.argv);

if(!program.args.length){
    program.help()
}