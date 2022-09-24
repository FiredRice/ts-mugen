import { currentWrite } from '../core';
import { BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface TurnParams extends BaseSctrls {
}

/**
 * Turn 
 * - 立即改变玩家的方向.不会播放转身动画.
 */
export default function Turn(params: TurnParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = Turn\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}