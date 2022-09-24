import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface TargetFacingParams extends BaseSctrls {
    value: AttrValue;
    ID?: AttrValue;
}

/**
 * TargetFacing 
 * - 使所有目标都朝向一个相对于玩家的指定方向.
 */
export default function TargetFacing(params: TargetFacingParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = TargetFacing\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}