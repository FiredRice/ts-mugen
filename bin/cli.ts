import fs from 'fs-extra';
import { joinDep } from './uitls';

export default class CliPkg {
    private pkgPath: string;
    private deps: string;

    constructor() {
        this.pkgPath = `${process.cwd()}/packages/cli/package.json`;
        this.deps = joinDep([`"@tsmugen/utils": "latest",`]);
    }

    public removeDep() {
        let pkg = fs.readFileSync(this.pkgPath).toString();
        pkg = pkg.replace(this.deps, '');
        fs.writeFileSync(this.pkgPath, pkg);
    }

    public resetDep() {
        let pkg = fs.readFileSync(this.pkgPath).toString();
        pkg = pkg.replace('\t\t"commander": "^9.4.0",\r\n', `${this.deps}\t\t"commander": "^9.4.0",\r\n`);
        fs.writeFileSync(this.pkgPath, pkg);
    }
}