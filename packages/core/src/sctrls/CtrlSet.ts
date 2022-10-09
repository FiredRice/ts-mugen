import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface CtrlSetParams extends BaseSctrls {
    value: AttrValue;
}

/**
 * CtrlSet 
 * - 设置玩家的控制标示.
 */
export default function CtrlSet(params: CtrlSetParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = CtrlSet\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}