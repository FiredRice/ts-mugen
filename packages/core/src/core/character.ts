import { getMugenConfig, getVersion } from '../core';
import { Helper, State } from '../state';
import { CharInfo } from '../types';

export default class Character {
    private info: CharInfo;
    private states: (State | Helper)[] = [];

    constructor() {
        const date = new Date();
        const defaultChar = getMugenConfig().character;
        this.info = {
            ...defaultChar,
            version: getVersion(),
            versiondate: `${date.getFullYear()}, ${date.getMonth() + 1}, ${date.getDate()}`,
        };
    }

    public injectStates(states: (State | Helper)[]) {
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
        result += `name = "${this.info.name}"\n`;
        result += `displayname = "${this.info.displayname || this.info.name}"\n`;
        result += `versiondate = ${this.info.versiondate}\n`;
        result += `mugenversion = ${this.info.version}\n`;
        result += `author = "${this.info.author}"\n`;
        result += `localcoord = ${this.info.localcoord.join(', ')}\n`;
        if (this.info.palDefaults != null) {
            result += `pal.defaults = ${this.info.palDefaults.join(', ')}\n`;
        }
        return result;
    }
}