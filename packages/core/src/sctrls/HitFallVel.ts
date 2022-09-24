import { currentWrite } from '../core';
import { BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface HitFallVelParams extends BaseSctrls {
}

/**
 * HitFallVel 
 * - 如果玩家被击中且处于下落状态,设置玩家在HitDef中指定的下落速度(中的速度值).(fall.xvel和fall.yvel)
 */
export default function HitFallVel(params: HitFallVelParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = HitFallVel\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}