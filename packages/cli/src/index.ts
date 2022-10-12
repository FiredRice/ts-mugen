#!/usr/bin/env node
import { program } from 'commander';
import start from './core/start';
import clean from './core/clean';
import build from './core/build';
import dev from './core/dev';

try {
    const { version } = require('../package.json');
    program
        .name('tsmugen')
        .usage('<command> [options]')
        .version(version, '-v, --version', '输出版本号');

    program
        .command('start')
        .description('启动 mugen 主程序')
        .action(start);

    program
        .command('build [version]')
        .description('构建人物包')
        .action(build);

    program
        .command('dev [version]')
        .description('调试人物包')
        .action(dev);

    program
        .command('clean')
        .description('清除调试时因异常退出导致的残留缓存')
        .action(clean);

    program.parse(process.argv);
} catch (error) {
    console.log(error);
}