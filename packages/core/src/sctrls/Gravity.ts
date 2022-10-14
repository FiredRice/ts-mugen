import { currentWrite } from '../core';
import { BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface GravityParams extends BaseSctrls {
}

/**
 * Gravity 
 * 
 * 使用玩家的"yaccel"常量值加速玩家下降.
 * 
 * ---
 * 示例:
 * ```
 * ; 整个状态中提供加速度常量.
 * trigger1 = 1
 * type = Gravity
 * ```
 */
export default function Gravity(params: GravityParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = Gravity\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}