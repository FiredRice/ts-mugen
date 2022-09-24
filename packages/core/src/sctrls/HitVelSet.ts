import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface HitVelSetParams extends BaseSctrls {
    x?: AttrValue;
    y?: AttrValue;
}

/**
 * HitVelSet 
 * - 不推荐使用此控制器.当玩家被击中,将玩家速度的所需分量设置为适当的受击速度.
 */
export default function HitVelSet(params: HitVelSetParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = HitVelSet\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}