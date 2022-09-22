import fs from 'fs-extra';
import { joinDep } from './uitls';

export default class ExamplePkg {
    private pkgPath: string;
    private deps: string;

    constructor() {
        this.pkgPath = `${process.cwd()}/example/package.json`;
        this.deps = joinDep([
            `"@tsmugen/cli": "latest",`,
            `"@tsmugen/core": "latest",`,
            `"@tsmugen/utils": "latest",`,
        ]);
    }

    public removeDep() {
        let pkg = fs.readFileSync(this.pkgPath).toString();
        pkg = pkg.replace(this.deps, '');
        fs.writeFileSync(this.pkgPath, pkg);
    }

    public resetDep() {
        let pkg = fs.readFileSync(this.pkgPath).toString();
        pkg = pkg.replace('\t\t"typescript": "^4.8.3"', `${this.deps}\t\t"typescript": "^4.8.3"`);
        fs.writeFileSync(this.pkgPath, pkg);
    }
}