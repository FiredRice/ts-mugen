import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface PowerAddParams extends BaseSctrls {
    value: AttrValue;
}

/**
 * PowerAdd 
 * - 增加指定数值给玩家的power(能量/气)值.
 */
export default function PowerAdd(params: PowerAddParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = PowerAdd\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}