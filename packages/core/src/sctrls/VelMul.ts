import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface VelMulParams extends BaseSctrls {
    x?: AttrValue;
    y?: AttrValue;
}

/**
 * VelMul 
 * - 将玩家的速度乘以指定的值.
 * - 正的x方向速度与玩家朝向相同,正的y方向速度指向屏幕下方.
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