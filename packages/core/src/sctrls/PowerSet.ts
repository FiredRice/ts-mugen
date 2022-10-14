import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface PowerSetParams extends BaseSctrls {
    /**
     * 设置给玩家的新的power值.
     */
    value: AttrValue;
}

/**
 * PowerSet 
 * 
 * 设置玩家拥有的power(能量/气)值.
 */
export default function PowerSet(params: PowerSetParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = PowerSet\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}