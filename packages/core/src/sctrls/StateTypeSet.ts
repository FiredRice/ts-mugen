import { currentWrite } from '../core';
import { BaseSctrls, MoveType, StateType } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface StateTypeSetParams extends BaseSctrls {
    statetype?: StateType;
    movetype?: MoveType;
    physics?: 'S' | 'C' | 'A' | 'N' | 'U';
}

/**
 * StateTypeSet 
 * - 更改当前的状态类型和招式类型.用于从地面进入空中的状态,等等...
 */
export default function StateTypeSet(params: StateTypeSetParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = StateTypeSet\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}