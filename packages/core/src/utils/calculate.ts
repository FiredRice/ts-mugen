import { isArray, isObject } from 'lodash';
import { BaseTrigger } from '../triggers';
import { BaseValue, AttrValue } from '../types';

/**
 * 判断是否为 TriggerValue
 */
export function isAttrValue(target: any): target is AttrValue {
    return isObject(target) && Reflect.has(target, 'value') && Reflect.has(target, '_setInnerName');
}

/**
 * TriggerValue 转换
 */
export function transAttrValue(target: AttrValue) {
    if (isObject(target)) {
        if (isAttrValue(target)) {
            return target.value
        } else {
            throw new Error(`[${target} is Not AttrValue]`);
        }
    }
    return target;
}

/**
 * 操作工厂
 */
export function optFactory(values: AttrValue[], opt: string) {
    let result = '';
    for (const value of values) {
        const _value = transAttrValue(value);
        if (!!result) {
            result += ` ${opt} ${_value}`;
        } else {
            result = `${_value}`;
        }
    }
    return result;
}

function funcOptResult(values: AttrValue[], opt: string) {
    const result = optFactory(values, opt);
    return `(${result})`;
}

/**
 * 加
 */
export function Add(...values: AttrValue[]) {
    return funcOptResult(values, '+');
}

/**
 * 减
 */
export function Sub(...values: AttrValue[]) {
    return funcOptResult(values, '-');
}

/**
 * 乘
 */
export function Multiply(...values: AttrValue[]) {
    return funcOptResult(values, '*');
}

/**
 * 除
 */
export function Division(...values: AttrValue[]) {
    return funcOptResult(values, '/');
}

/**
 * 取余
 */
export function Remainder(...values: AttrValue[]) {
    return funcOptResult(values, '%');
}

/**
 * 幂运算
 */
export function Pow(x: AttrValue, y: AttrValue) {
    return `${transAttrValue(x)} ** ${transAttrValue(y)}`;
}

/**
 * 逻辑与运算
 */
export function And(...values: AttrValue[]) {
    return funcOptResult(values, '&&');
}

/**
 * 逻辑或运算
 */
export function Or(...values: AttrValue[]) {
    return funcOptResult(values, '||');
}

/**
 * 逻辑异或运算
 */
export function Xor(...values: AttrValue[]) {
    return funcOptResult(values, '^^');
}

/**
 * 按位取反运算符
 */
export function ByteReversed(...values: AttrValue[]): string {
    return funcOptResult(values, '~');
}

/**
 * 按位与运算符
 */
export function ByteAnd(...values: AttrValue[]): string {
    return funcOptResult(values, '&');
}

/**
 * 按位或运算符
 */
export function ByteOr(...values: AttrValue[]): string {
    return funcOptResult(values, '|');
}

/**
 * 按位异或运算符
 */
export function ByteXor(...values: AttrValue[]): string {
    return funcOptResult(values, '^');
}

/**
 * 等于
 */
export function Equal(x: AttrValue | AttrValue[], y: AttrValue | AttrValue[]) {
    const xValue = isArray(x) ? `(${x.map(item => transAttrValue(item)).join(', ')})` : transAttrValue(x);
    const yValue = isArray(y) ? `(${y.map(item => transAttrValue(item)).join(', ')})` : transAttrValue(y);
    return `(${xValue} = ${yValue})`;
}

/**
 * 不等于
 */
export function NotEqual(x: AttrValue | AttrValue[], y: AttrValue | AttrValue[]) {
    const xValue = isArray(x) ? `(${x.map(item => transAttrValue(item)).join(', ')})` : transAttrValue(x);
    const yValue = isArray(y) ? `(${y.map(item => transAttrValue(item)).join(', ')})` : transAttrValue(y);
    return `(${xValue} != ${yValue})`;
}

/**
 * 逻辑非运算
 */
export function Not(value: AttrValue) {
    return `!(${transAttrValue(value)})`;
}

/**
 * 小于
 */
export function Less(x: AttrValue, y: AttrValue) {
    return `(${transAttrValue(x)} < ${transAttrValue(y)})`;
}

/**
 * 大于
 */
export function Over(x: AttrValue, y: AttrValue) {
    return `(${transAttrValue(x)} > ${transAttrValue(y)})`;
}

/**
 * 大于等于
 */
export function OverEqual(x: AttrValue, y: AttrValue) {
    return `(${transAttrValue(x)} >= ${transAttrValue(y)})`;
}

/**
 * 小于等于
 */
export function LessEqual(x: AttrValue, y: AttrValue) {
    return `(${transAttrValue(x)} <= ${transAttrValue(y)})`;
}

/**
 * 介于
 */
export function Between(value: AttrValue, range: [AttrValue, AttrValue]) {
    return `(${transAttrValue(value)} = [${transAttrValue(range[0])}, ${transAttrValue(range[1])}])`;
}

/**
 * 赋值
 */
export function SetValue(value: AttrValue, target: AttrValue) {
    return `(${transAttrValue(value)} := ${transAttrValue(target)})`;
}

/**
 * 括号
 */
export function Bracket(target: BaseTrigger): BaseTrigger;
export function Bracket(target: BaseValue): string;
export function Bracket(target: any) {
    const reg = /^\(.*\)$/;
    if (isObject(target)) {
        const _target: any = target;
        if (!reg.test(`${_target.value}`)) {
            _target?._setInnerName(`(${_target.value})`);
        }
        return _target;
    }
    return reg.test(`${target}`) ? target : `(${target})`;
}