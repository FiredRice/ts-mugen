import fs from 'fs-extra';
import { joinDep } from './uitls';

export default class CorePkg {
    private pkgPath: string;
    private deps: string;

    constructor() {
        this.pkgPath = `${process.cwd()}/packages/core/package.json`;
        this.deps = joinDep([`"@tsmugen/utils": "latest",`]);
    }

    public removeDep() {
        let pkg = fs.readFileSync(this.pkgPath).toString();
        pkg = pkg.replace(this.deps, '');
        fs.writeFileSync(this.pkgPath, pkg);
    }

    public resetDep() {
        let pkg = fs.readFileSync(this.pkgPath).toString();
        pkg = pkg.replace('\t\t"lodash": "^4.17.21"', `${this.deps}\t\t"lodash": "^4.17.21"`);
        fs.writeFileSync(this.pkgPath, pkg);
    }
}