import { Triggers, TriggerValue } from '../types';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

export function transTriggerValue(target: TriggerValue) {
    return isObject(target) ? target.value : target;
}

export function objectToString(value, prevKey = '') {
    if (isObject(value)) {
        let result = '';
        const keys = Object.keys(value);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const currentValue = value[key];
            if (isArray(currentValue)) {
                result += `${prevKey}${key} = ${currentValue.join(', ')}\n`;
            } else if (isObject(currentValue)) {
                result += objectToString(currentValue, `${key}.`);
            } else {
                result += `${prevKey}${key} = ${currentValue}\n`;
            }
        }
        return result;
    }
    return '';
};

export function triggersToString(triggers: Triggers) {
    if (isObject(triggers)) {
        if (triggers['value'] != null) {
            return `trigger1 = ${triggers['value']}\n`;
        }
        return triggers.toString();
    }
    return `trigger1 = ${triggers}\n`;
}

export * from './calculate';