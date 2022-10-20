import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface HitVelSetParams extends BaseSctrls {
    /**
     * 非0的参数意味着把玩家速度的x分量变为受击速度.
     */
    x?: AttrValue;
    /**
     * 非0的参数意味着把玩家速度的y分量变为受击速度.
     */
    y?: AttrValue;
}

/**
 * HitVelSet 
 * 
 * 不推荐使用此控制器.当玩家被击中,将玩家速度的所需分量设置为适当的受击速度.
 * 
 * ---
 * **注意：**
 * 
 * **废弃了.**
 */
export default function HitVelSet(params: HitVelSetParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = HitVelSet\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}