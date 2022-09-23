import { getMugenConfig, getVersion } from '@tsmugen/utils';
import { State } from '../state';
import { CharInfo } from '../types';
import { transStr } from '../utils';

export default class Character {
    private info: CharInfo;
    private states: State[] = [];

    constructor() {
        const date = new Date();
        const defaultChar = getMugenConfig().character;
        this.info = {
            ...defaultChar,
            version: getVersion(),
            versiondate: `${date.getFullYear()}, ${date.getMonth() + 1}, ${date.getDate()}`,
        };
    }

    public injectStates(states: State[]) {
        this.states = states;
    }

    public getStates() {
        return this.states;
    }

    public getInfo() {
        return this.info;
    }

    public toString() {
        let result = `[Info]\n`;
        result += `name = "${transStr(this.info.name)}"\n`;
        result += `displayname = "${transStr(this.info.displayname || this.info.name)}"\n`;
        result += `versiondate = ${transStr(this.info.versiondate)}\n`;
        result += `mugenversion = ${this.info.version}\n`;
        result += `author = "${transStr(this.info.author)}"\n`;
        result += `localcoord = ${this.info.localcoord.join(', ')}\n`;
        if (this.info.palDefaults != null) {
            result += `pal.defaults = ${this.info.palDefaults.join(', ')}\n`;
        }
        return result;
    }
}