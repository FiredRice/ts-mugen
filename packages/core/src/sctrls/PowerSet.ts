import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface PowerSetParams extends BaseSctrls {
    value: AttrValue;
}

/**
 * PowerSet 
 * - 设置玩家拥有的power(能量/气)值.
 */
export default function PowerSet(params: PowerSetParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = PowerSet\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}