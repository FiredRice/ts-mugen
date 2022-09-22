import { exec } from 'shelljs';
import ExamplePkg from './example';
import CorePkg from './core';
import CliPkg from './cli';

const example = new ExamplePkg();
const core = new CorePkg();
const cli = new CliPkg();

try {
    example.removeDep();
    core.removeDep();
    cli.removeDep();

    exec(`yarn install`);
    exec(`yarn build`);

    example.resetDep();
    core.resetDep();
    cli.resetDep();
} catch (error) {
    console.log(error);
}