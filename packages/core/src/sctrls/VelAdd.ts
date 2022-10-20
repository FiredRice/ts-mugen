import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface VelAddParams extends BaseSctrls {
    /**
     * 玩家的x方向速度指定的增加值.
     */
    x?: AttrValue;
    /**
     * 玩家的y方向速度指定的增加值.
     */
    y?: AttrValue;
}

/**
 * VelAdd 
 * 
 * 增加玩家速度指定值.
 * 
 * 正的x方向速度与玩家朝向相同,正的y方向速度指向屏幕下方.
 * 
 * ---
 * 示例:
 * ```
 * ; 将引力常数应用到玩家上. 
 * trigger1 = 1
 * type = VelAdd
 * y = 0.45
 * ```
 */
export default function VelAdd(params: VelAddParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = VelAdd\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}