import { BaseValue } from '../types';
import { BaseTrigger } from './base';

/**
 * 计算参数的绝对值
 */
export function Abs(value: BaseValue) {
    return new BaseTrigger(`abs(${value})`);
}

/**
 * 计算指定参数的反正弦值(用弧度制表示)
 */
export function Asin(value: BaseValue) {
    return new BaseTrigger(`asin(${value})`);
}

/**
 * 计算指定参数的arccosine(反余弦)(用弧度制表示)
 */
export function Acos(value: BaseValue) {
    return new BaseTrigger(`acos(${value})`);
}

/**
 * 计算指定参数的反正切(用弧度制表示)
 */
export function Atan(value: BaseValue) {
    return new BaseTrigger(`atan(${value})`);
}

/**
 * 向上取整
 */
export function Ceil(value: BaseValue) {
    return new BaseTrigger(`Ceil(${value})`);
}

/**
 * 代替ifelse而避免任何由于计算不需要使用的参数而所引起的副作用.
 */
export function Cond(trigger: BaseValue, success: BaseValue, error: BaseValue) {
    return new BaseTrigger(`Cond(${trigger}, ${success}, ${error})`);
}

/**
 * 把 240p 坐标空间转换成玩家的坐标空间.
 */
export function Const240p(value: BaseValue) {
    return new BaseTrigger(`Const240p(${value})`);
}

/**
 * 把 480p 坐标空间转换成玩家的坐标空间.
 */
export function Const480p(value: BaseValue) {
    return new BaseTrigger(`Const480p(${value})`);
}

/**
 * 把 720p 坐标空间转换成玩家的坐标空间.
 */
export function Const720p(value: BaseValue) {
    return new BaseTrigger(`Const720p(${value})`);
}

/**
 * 计算指定参数的余弦值(用弧度制表示).
 */
export function Cos(value: BaseValue) {
    return new BaseTrigger(`cos(${value})`);
}

/**
 * 返回自然数 e 的值(2.718281828...)
 */
export const E = new BaseTrigger('E');

/**
 * 计算自然数 e 的参数次幂.
 * 这种计算方式略微比等价的表达式e**(参数)精确些.
 */
export function Exp(value: BaseValue) {
    return new BaseTrigger(`Exp(${value})`);
}

/**
 * 实现floor(向下取整)函数.
 * 返回小于等于参数的最大整数.
 */
export function Floor(value: BaseValue) {
    return new BaseTrigger(`Floor(${value})`);
}

/**
 * ifelse
 */
export function IfElse(trigger: BaseValue, success: BaseValue, error: BaseValue) {
    return new BaseTrigger(`IfElse(${trigger}, ${success}, ${error})`);
}

/**
 * 返回参数的自然对数.
 * 产生的结果比等价的log(e,(argument))更为精确.
 */
export function Ln(value: BaseValue) {
    return new BaseTrigger(`Ln(${value})`);
}

/**
 * 返回以a为底,b的对数.
 */
export function Log(a: BaseValue, b: BaseValue) {
    return new BaseTrigger(`Log(${a}, ${b})`);
}

/**
 * 圆周率 PI
 */
export const Pi = new BaseTrigger('Pi');

/**
 * 如果指定ID号的玩家存在则返回1,否则返回0.
 */
export function PlayerIDExist(value: BaseValue) {
    return new BaseTrigger(`PlayerIDExist(${value})`);
}

/**
 * 随机数
 */
export const Random = new BaseTrigger('Random');

/**
 * 计算指定参数正弦值(用弧度制表示)
 */
export function Sin(value: BaseValue) {
    return new BaseTrigger(`sin(${value})`);
}

/**
 * 计算指定参数的正切值(弧度制).
 */
export function Tan(value: BaseValue) {
    return new BaseTrigger(`tan(${value})`);
}

/**
 * 返回每秒的帧数.用于计算时间方面.
 */
export const TicksPerSecond = new BaseTrigger('TicksPerSecond');