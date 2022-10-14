import { currentWrite } from '../core';
import { BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface MoveHitResetParams extends BaseSctrls {
}

/**
 * MoveHitReset 
 * 
 * 重置movehit标示到0.
 * 
 * 就是说,执行了MoveHitReset后,MoveContact, MoveGuarded, MoveHit触发器将都返回0
 */
export default function MoveHitReset(params: MoveHitResetParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = MoveHitReset\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}