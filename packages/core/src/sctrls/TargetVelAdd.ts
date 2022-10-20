import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface TargetVelAddParams extends BaseSctrls {
    /**
     * 目标x方向速度指定的增加值.
     */
    x?: AttrValue;
    /**
     * 目标y方向速度指定的增加值.
     */
    y?: AttrValue;
    /**
     * 指定要作用的目标ID号.只有此ID号的目标将被影响.
     * - 默认为-1.(对所有目标起作用)
     */
    ID?: AttrValue;
}

/**
 * TargetVelAdd 
 * 
 * 增加所有目标速度指定值.
 * 
 * 正的x方向速度与目标朝向相同,正的y方向速度指向屏幕下方.
 * 
 * ---
 * 示例:
 * ```
 * ; 将引力常数应用到所有目标上. 
 * type = TargetVelAdd
 * trigger1 = 1
 * y = 0.45
 * ```
 */
export default function TargetVelAdd(params: TargetVelAddParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = TargetVelAdd\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}