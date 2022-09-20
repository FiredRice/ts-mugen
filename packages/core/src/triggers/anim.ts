import { BaseValue } from '../types';
import { BaseTrigger } from './base';

export const anim = new BaseTrigger('Anim');

export const animelem = new BaseTrigger('AnimElem');

export const animtime = new BaseTrigger('AnimTime');

export function AnimElemNo(elementValue: BaseValue) {
    return new BaseTrigger(`AnimElemNo(${elementValue})`);
}

export function AnimElemTime(elementValue: BaseValue) {
    return new BaseTrigger(`AnimElemTime(${elementValue})`);
}

export function AnimExist(elementValue: BaseValue) {
    return new BaseTrigger(`AnimExist(${elementValue})`);
}

export function SelfAnimExist(elementValue: BaseValue) {
    return new BaseTrigger(`SelfAnimExist(${elementValue})`);
}