import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface TargetPowerAddParams extends BaseSctrls {
    /**
     * 增加到每个目标上的能量值.
     */
    value: AttrValue;
    /**
     * 指定要作用的目标ID号.只有此ID号的目标将被影响.
     * - 默认为-1.(对所有目标起作用)
     */
    ID?: AttrValue;
}

/**
 * TargetPowerAdd 
 * 
 * 增加所有目标能量值.
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