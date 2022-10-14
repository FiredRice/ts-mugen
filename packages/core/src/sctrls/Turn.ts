import { currentWrite } from '../core';
import { BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface TurnParams extends BaseSctrls {
}

/**
 * Turn 
 * 
 * 立即改变玩家的方向.不会播放转身动画.
 * 
 * ---
 * 特例:
 * ```
 * helper锁定和root同一个方向:
 * [State 0, Turn]
 * type = Turn
 * trigger1 = facing != root,facing
 * ```
 */
export default function Turn(params: TurnParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = Turn\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}