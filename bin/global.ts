import fs from 'fs-extra';
import { joinDep } from './uitls';

export default class GobalPkg {
    private pkgPath: string;
    private deps: string;

    constructor() {
        this.pkgPath = `${process.cwd()}/packages/global/package.json`;
        this.deps = joinDep([
            `"@tsmugen/core": "^2.0.5"`,
        ]);
    }

    public removeDep() {
        let pkg = fs.readFileSync(this.pkgPath).toString();
        pkg = pkg.replace(this.deps, '');
        fs.writeFileSync(this.pkgPath, pkg);
    }

    public resetDep() {
        let pkg = fs.readFileSync(this.pkgPath).toString();
        pkg = pkg.replace('\t"dependencies": {', `\t"dependencies": {\r\n${this.deps}`);
        fs.writeFileSync(this.pkgPath, pkg);
    }
}