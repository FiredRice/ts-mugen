import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface BindToTargetParams extends BaseSctrls {
    time?: AttrValue;
    ID?: AttrValue;
    pos?: [AttrValue, AttrValue];
}

/**
 * BindToTarget 
 * - 把玩家绑定到相对于指定目标的指定位置.
 */
export default function BindToTarget(params: BindToTargetParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = BindToTarget\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}