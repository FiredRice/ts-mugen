import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils/index';

export interface CtrlSetParams extends BaseSctrls {
    /**
     * - 非0表示受控制
     * - 0表示不受控制.
     */
    value: AttrValue;
}

/**
 * CtrlSet 
 * 
 * 设置玩家的控制标示.
 */
export default function CtrlSet(params: CtrlSetParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = CtrlSet\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}