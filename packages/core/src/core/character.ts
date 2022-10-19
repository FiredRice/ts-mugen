import { getMugenConfig, getVersion } from '@tsmugen/utils';
import { CharInfo, StatedefType } from '../types';
import { transStr } from '../utils';

export default class Character<T extends StatedefType | string> {
    private info: CharInfo;
    private states: T[] = [];

    constructor() {
        const date = new Date();
        const defaultChar = getMugenConfig().character;
        this.info = {
            ...defaultChar,
            version: getVersion(),
            versiondate: `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`,
        };
    }

    /**
     * 注入 State
     * @param states
     */
    public injectStates(states: T[]) {
        this.states = states;
    }

    /**
     * 获取 State
     * @returns states
     */
    public getStates() {
        return this.states;
    }

    /**
     * 获取角色信息
     * @returns info
     */
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