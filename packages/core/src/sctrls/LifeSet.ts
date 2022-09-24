import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface LifeSetParams extends BaseSctrls {
    value: AttrValue;
}

/**
 * LifeSet 
 * - 把玩家的生命值设置为指定的值.
 */
export default function LifeSet(params: LifeSetParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = LifeSet\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}