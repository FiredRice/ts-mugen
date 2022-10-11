import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface TargetVelSetParams extends BaseSctrls {
    x?: AttrValue;
    y?: AttrValue;
    ID?: AttrValue;
}

/**
 * TargetVelSet 
 * - 设置所有目标的速度为指定值.
 * - 正的x方向速度与目标朝向相同,正的y方向速度指向屏幕下方.
 */
export default function TargetVelSet(params: TargetVelSetParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = TargetVelSet\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}