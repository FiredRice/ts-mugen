import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface TargetFacingParams extends BaseSctrls {
    /**
     * - 如果facing_val是正数,所有目标的朝向都将与玩家相同.
     * - 如果facing_val是负数,所有目标的朝向都将与玩家相反.
     */
    value: AttrValue;
    /**
     * 指定要作用的ID号.只有此ID号的目标将被影响.
     * - 默认为-1.(对所有目标起作用)
     */
    ID?: AttrValue;
}

/**
 * TargetFacing 
 * 
 * 使所有目标都朝向一个相对于玩家的指定方向.
 */
export default function TargetFacing(params: TargetFacingParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = TargetFacing\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}