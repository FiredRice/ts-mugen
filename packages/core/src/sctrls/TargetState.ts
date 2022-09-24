import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface TargetStateParams extends BaseSctrls {
    value: AttrValue;
    ID?: AttrValue;
}

/**
 * TargetState 
 * - 使所有目标进入指定的状态号.
 */
export default function TargetState(params: TargetStateParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = TargetState\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}