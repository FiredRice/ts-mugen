import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface TargetPowerAddParams extends BaseSctrls {
    value: AttrValue;
    ID?: AttrValue;
}

/**
 * TargetPowerAdd 
 * - 增加所有目标能量值.
 */
export default function TargetPowerAdd(params: TargetPowerAddParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = TargetPowerAdd\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}