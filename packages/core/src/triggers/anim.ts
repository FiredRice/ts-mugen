import { AttrValue } from '../types';
import { transAttrValue } from '../utils';
import { BaseTrigger } from './base';

export const anim = new BaseTrigger('Anim');

export const animelem = new BaseTrigger('AnimElem');

export const animtime = new BaseTrigger('AnimTime');

export function AnimElemNo(elementValue: AttrValue) {
    return new BaseTrigger(`AnimElemNo(${transAttrValue(elementValue)})`);
}

export function AnimElemTime(elementValue: AttrValue) {
    return new BaseTrigger(`AnimElemTime(${transAttrValue(elementValue)})`);
}

export function AnimExist(elementValue: AttrValue) {
    return new BaseTrigger(`AnimExist(${transAttrValue(elementValue)})`);
}

export function SelfAnimExist(elementValue: AttrValue) {
    return new BaseTrigger(`SelfAnimExist(${transAttrValue(elementValue)})`);
}