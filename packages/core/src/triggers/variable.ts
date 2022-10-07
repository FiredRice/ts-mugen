import { AttrValue, BaseValue } from '../types';
import { transAttrValue, transStr } from '../utils';
import { BaseTrigger } from './base';

type InfoParams = 'info.name' | 'info.displayname' | 'info.authorname';
export function StageVar(value: InfoParams) {
    const name = `StageVar(${value})`;

    /**
     * 等于
     */
    function equal(value: BaseValue) {
        return `${name} = "${transStr(value)}"`;
    }

    /**
     * 不等于
     */
    function notEqual(value: BaseValue) {
        return `${name} != "${transStr(value)}"`;
    }

    return {
        value: name,
        equal,
        notEqual
    };
}

export function sysFVar(value: AttrValue) {
    return new BaseTrigger(`SysFVar(${transAttrValue(value)})`);
}
export function sysVar(value: AttrValue) {
    return new BaseTrigger(`SysVar(${transAttrValue(value)})`);
}
