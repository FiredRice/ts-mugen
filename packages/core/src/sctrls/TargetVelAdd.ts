import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface TargetVelAddParams extends BaseSctrls {
    x?: AttrValue;
    y?: AttrValue;
    ID?: AttrValue;
}

/**
 * TargetVelAdd 
 * - 增加所有目标速度指定值.
 * - 正的x方向速度与目标朝向相同,正的y方向速度指向屏幕下方.
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