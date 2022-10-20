import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface TargetStateParams extends BaseSctrls {
    /**
     * 指定目标要进入的状态号.
     */
    value: AttrValue;
    /**
     * 指定要作用的目标ID号.只有此ID号的目标将被影响.
     * - 默认为-1.(对所有目标起作用)
     */
    ID?: AttrValue;
}

/**
 * TargetState 
 * 
 * 使所有目标进入指定的状态号.
 */
export default function TargetState(params: TargetStateParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = TargetState\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}