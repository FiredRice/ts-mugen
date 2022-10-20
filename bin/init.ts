import { exec } from 'shelljs';
import ExamplePkg from './example';
import CorePkg from './core';
import CliPkg from './cli';
import GobalPkg from './global';

const example = new ExamplePkg();
const global = new GobalPkg();
const core = new CorePkg();
const cli = new CliPkg();

try {
    example.removeDep();
    core.removeDep();
    cli.removeDep();
    global.removeDep();

    exec(`yarn install`);
    exec(`yarn build`);

    example.resetDep();
    core.resetDep();
    cli.resetDep();
    global.resetDep();
} catch (error) {
    console.log(error);
}