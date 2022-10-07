import { isObject } from 'lodash';
import { AttrValue } from '../types';

export class Triggers {
    private triggerAll = '';
    private triggerNums = '';
    private index = 0;

    public clear() {
        this.triggerAll = '';
        this.triggerNums = '';
        this.index = 0;
    }

    public appendAll(...triggers: AttrValue[]) {
        for (const trigger of triggers) {
            const value = isObject(trigger) ? trigger.value : trigger;
            this.triggerAll += `TriggerAll = ${value}\n`;
        }
        return this;
    }

    public appendOr(...triggers: AttrValue[]) {
        for (const trigger of triggers) {
            this.index++;
            const value = isObject(trigger) ? trigger.value : trigger;
            this.triggerNums += `trigger${this.index} = ${value}\n`;
        }
        return this;
    }

    public appendAnd(...triggers: AttrValue[]) {
        this.index++;
        for (const trigger of triggers) {
            const value = isObject(trigger) ? trigger.value : trigger;
            this.triggerNums += `trigger${this.index} = ${value}\n`;
        }
        return this;
    }

    public toString() {
        return `${this.triggerAll}${this.triggerNums}`;
    }
}
