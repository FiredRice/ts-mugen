import { currentWrite } from '../core';
import { BaseSctrls, BaseValue } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface ChangeAnimParams extends BaseSctrls {
    value: BaseValue;
    elem?: BaseValue;
}

/**
 * ChangeAnim 
 * - 改变玩家动作号
 */
export default function ChangeAnim(params: ChangeAnimParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = ChangeAnim\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}