import { BaseValue, Triggers } from '../types';
import { isArray, isObject, isString } from 'lodash';
import { isAttrValue, transAttrValue } from './calculate';

export function objectToString(value, prevKey = '') {
    if (isObject(value)) {
        let result = '';
        const keys = Object.keys(value);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const currentValue = value[key];
            if (isArray(currentValue)) {
                result += `${prevKey}${key} = ${currentValue.map(transAttrValue).join(', ')}\n`;
            } else if (isObject(currentValue)) {
                if (isAttrValue(currentValue)) {
                    result += `${prevKey}${key} = ${transAttrValue(currentValue)}\n`;
                } else {
                    result += objectToString(currentValue, `${key}.`);
                }
            } else {
                result += `${prevKey}${key} = ${transAttrValue(currentValue)}\n`;
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

const tableMap = {
    '\n': '\\n',
    '\r': '\\r',
    '\f': '\\f',
    '\t': '\\t',
    '\v': '\\v'
};

/**
 * 字符串去除空白字符
 */
export function transStr(target: BaseValue) {
    return isString(target) ? target.replace(/(?=[^ ])(\s)/g, str => tableMap[str] || ' ') : target;
}

export * from './calculate';
export { default as fileService } from './file';