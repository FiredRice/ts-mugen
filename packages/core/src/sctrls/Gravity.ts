import { currentWrite } from '../core';
import { BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface GravityParams extends BaseSctrls {
}

/**
 * Gravity 
 * - 使用玩家的"yaccel"常量值加速玩家下降.
 */
export default function Gravity(params: GravityParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = Gravity\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}