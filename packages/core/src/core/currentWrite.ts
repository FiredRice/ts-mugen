import { Statedef } from '../state';
import { BaseValue } from '../types';
import { currentVersion, objectToString } from '../utils';

class CurrentWrite {
    private text: string;
    public currentStateId?: BaseValue;
    private currentState: String;;
    private rootVarMap: any = {};
    private rootFVarMap: any = {};

    constructor() {
        this.currentState = '';
        this.text = '';
    }

    public addVar(index: BaseValue, desc: string) {
        this.rootVarMap[index] = desc;
    }

    public addFVar(index: BaseValue, desc: string) {
        this.rootFVarMap[index] = desc;
    }

    public getVarRecords() {
        return this.rootVarMap;
    }

    public getFVarRecords() {
        return this.rootFVarMap;
    }

    public setState(statedef: Statedef) {
        const { id, describe = '', version, ...otherParams } = statedef;
        let result = '';
        if (version == null || version === currentVersion) {
            result = `[Statedef ${id}]\n`;
            if (!!describe) {
                result = `; ${describe}\n${result}`;
            }
            result += `${objectToString(otherParams)}\n`;
            this.currentStateId = id;
        }
        this.currentState = result;
    }

    public append(code: string) {
        this.text = `${this.text}${code}\n`;
    }

    public getCode() {
        return `${this.currentState}${this.text}`;
    }

    public clean() {
        this.currentState = '';
        this.text = '';
    }
}

export const currentWrite = new CurrentWrite();