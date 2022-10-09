import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface HitAddParams extends BaseSctrls {
    value: AttrValue;
}

/**
 * HitAdd 
 * - 增加当前连击数。
 */
export default function HitAdd(params: HitAddParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = HitAdd\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}