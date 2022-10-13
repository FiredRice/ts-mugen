import { isObject } from 'lodash';
import { AttrValue } from '../types';

export class Triggers {
    private triggerAll = '';
    private triggerMap: any = {};
    private _innerIndex = 0;

    public clear() {
        this.triggerAll = '';
        this._innerIndex = 0;
        this.triggerMap = {};
    }

    public appendAll(...triggers: AttrValue[]) {
        for (const trigger of triggers) {
            const value = isObject(trigger) ? trigger.value : trigger;
            this.triggerAll += `TriggerAll = ${value}\n`;
        }
        return this;
    }

    public appendAnd(...triggers: AttrValue[]) {
        this._innerIndex++;
        this.add(this._innerIndex, ...triggers);
        return this;
    }

    public add(index: number, ...triggers: AttrValue[]) {
        for (const trigger of triggers) {
            const value = isObject(trigger) ? trigger.value : trigger;
            this.triggerMap[index] = this.triggerMap[index] || '';
            this.triggerMap[index] += `trigger${index} = ${value}\n`;
        }
        return this;
    }

    public toString() {
        let triggerNums = '';
        Object.keys(this.triggerMap).sort((a, b) => Number(a) - Number(b)).forEach(key => {
            triggerNums += this.triggerMap[key];
        });
        return `${this.triggerAll}${triggerNums}`;
    }
}
