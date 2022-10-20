import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface VelMulParams extends BaseSctrls {
    /**
     * 指定乘以玩家x方向速度的值.
     */
    x?: AttrValue;
    /**
     * 指定乘以玩家y方向速度的值.
     */
    y?: AttrValue;
}

/**
 * VelMul 
 * 
 * 将玩家的速度乘以指定的值.
 * 
 * 正的x方向速度与玩家朝向相同,正的y方向速度指向屏幕下方.
 * 
 * ---
 * 示例：
 * ```
 * ; 将摩擦力常量应用到玩家上.
 * trigger1 = 1
 * type = VelMul
 * x = 0.8
 * ```
 */
export default function VelMul(params: VelMulParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = VelMul\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}