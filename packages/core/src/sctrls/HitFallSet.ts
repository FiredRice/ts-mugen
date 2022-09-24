import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface HitFallSetParams extends BaseSctrls {
    value?: AttrValue;
    xvel?: AttrValue;
    yvel?: AttrValue;
}

/**
 * HitFallSet 
 * - 当玩家被击中,设置玩家的下落变量.
 */
export default function HitFallSet(params: HitFallSetParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = HitFallSet\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}