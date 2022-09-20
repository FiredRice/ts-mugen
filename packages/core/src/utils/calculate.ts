import { isArray, isObject } from 'lodash';
import { transTriggerValue } from './index';
import { BaseTrigger } from '../triggers';
import { BaseValue, TriggerValue } from '../types';

/**
 * 操作工厂
 */
export function optFactory(values: TriggerValue[], opt: string) {
    let result = '';
    for (const value of values) {
        const _value = transTriggerValue(value);
        if (!!result) {
            result += ` ${opt} ${_value}`;
        } else {
            result = `${_value}`;
        }
    }
    return result;
}

function funcOptResult(values: TriggerValue[], opt: string) {
    const result = optFactory(values, opt);
    return `(${result})`;
}

/**
 * 加
 */
export function Add(...values: TriggerValue[]) {
    return funcOptResult(values, '+');
}

/**
 * 减
 */
export function Sub(...values: TriggerValue[]) {
    return funcOptResult(values, '-');
}

/**
 * 乘
 */
export function Multiply(...values: TriggerValue[]) {
    return funcOptResult(values, '*');
}

/**
 * 除
 */
export function Division(...values: TriggerValue[]) {
    return funcOptResult(values, '/');
}

/**
 * 取余
 */
export function Remainder(...values: TriggerValue[]) {
    return funcOptResult(values, '%');
}

/**
 * 幂运算
 */
export function Pow(x: TriggerValue, y: TriggerValue) {
    return `${transTriggerValue(x)} ** ${transTriggerValue(y)}`;
}

/**
 * 逻辑与运算
 */
export function And(...values: TriggerValue[]) {
    return funcOptResult(values, '&&');
}

/**
 * 逻辑或运算
 */
export function Or(...values: TriggerValue[]) {
    return funcOptResult(values, '||');
}

/**
 * 逻辑异或运算
 */
export function Xor(...values: TriggerValue[]) {
    return funcOptResult(values, '^^');
}

/**
 * 按位取反运算符
 */
export function ByteReversed(...values: TriggerValue[]): string {
    return funcOptResult(values, '~');
}

/**
 * 按位与运算符
 */
export function ByteAnd(...values: TriggerValue[]): string {
    return funcOptResult(values, '&');
}

/**
 * 按位或运算符
 */
export function ByteOr(...values: TriggerValue[]): string {
    return funcOptResult(values, '|');
}

/**
 * 按位异或运算符
 */
export function ByteXor(...values: TriggerValue[]): string {
    return funcOptResult(values, '^');
}

/**
 * 等于
 */
export function Equal(x: TriggerValue | TriggerValue[], y: TriggerValue | TriggerValue[]) {
    const xValue = isArray(x) ? `(${x.map(item => transTriggerValue(item)).join(', ')})` : transTriggerValue(x);
    const yValue = isArray(y) ? `(${y.map(item => transTriggerValue(item)).join(', ')})` : transTriggerValue(y);
    return `(${xValue} = ${yValue})`;
}

/**
 * 不等于
 */
export function NotEqual(x: TriggerValue | TriggerValue[], y: TriggerValue | TriggerValue[]) {
    const xValue = isArray(x) ? `(${x.map(item => transTriggerValue(item)).join(', ')})` : transTriggerValue(x);
    const yValue = isArray(y) ? `(${y.map(item => transTriggerValue(item)).join(', ')})` : transTriggerValue(y);
    return `(${xValue} != ${yValue})`;
}

/**
 * 逻辑非运算
 */
export function Not(value: TriggerValue) {
    return `!(${transTriggerValue(value)})`;
}

/**
 * 小于
 */
export function Less(x: TriggerValue, y: TriggerValue) {
    return `(${transTriggerValue(x)} < ${transTriggerValue(y)})`;
}

/**
 * 大于
 */
export function Over(x: TriggerValue, y: TriggerValue) {
    return `(${transTriggerValue(x)} > ${transTriggerValue(y)})`;
}

/**
 * 大于等于
 */
export function OverEqual(x: TriggerValue, y: TriggerValue) {
    return `(${transTriggerValue(x)} >= ${transTriggerValue(y)})`;
}

/**
 * 小于等于
 */
export function LessEqual(x: TriggerValue, y: TriggerValue) {
    return `(${transTriggerValue(x)} <= ${transTriggerValue(y)})`;
}

/**
 * 介于
 */
export function Between(value: TriggerValue, range: [TriggerValue, TriggerValue]) {
    return `(${transTriggerValue(value)} = [${transTriggerValue(range[0])}, ${transTriggerValue(range[1])}])`;
}

/**
 * 赋值
 */
export function SetValue(value: TriggerValue, target: TriggerValue) {
    return `(${transTriggerValue(value)} := ${transTriggerValue(target)})`;
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