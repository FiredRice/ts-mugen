#!/usr/bin/env node
import { program } from 'commander';
import start from './core/start';
import clean from './core/clean';
import build from './core/build';

try {
    const { version } = require('../package.json');
    program
        .name('tsmugen')
        .usage('<command> [options]')
        .version(version, '-v, --version', '输出版本号');
    
    program
        .command('start')
        .description('开始调试')
        .action(start);
    
    program
        .command('build [version]')
        .description('构建人物包')
        .action(build);
    
    program
        .command('clean [version]')
        .description('开始调试')
        .action(clean);
    
    program.parse(process.argv);
} catch (error) {
    console.log(error);
}