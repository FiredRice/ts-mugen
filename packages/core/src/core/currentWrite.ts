import { BaseValue } from '../types';

class CurrentWrite {
    private text: string;
    public currentStateId?: BaseValue;
    private rootVarMap: any = {};
    private rootFVarMap: any = {};

    constructor() {
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

    public append(code: string) {
        this.text = `${this.text}${code}\n`;
    }

    public getCode() {
        return this.text;
    }

    public clear() {
        this.text = '';
    }
}

export const currentWrite = new CurrentWrite();