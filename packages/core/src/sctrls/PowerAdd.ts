import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface PowerAddParams extends BaseSctrls {
    /**
     * 增加到玩家的power上的值.
     */
    value: AttrValue;
}

/**
 * PowerAdd 
 * 
 * 增加指定数值给玩家的power(能量/气)值.
 */
export default function PowerAdd(params: PowerAddParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = PowerAdd\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}