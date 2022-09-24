import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface VelAddParams extends BaseSctrls {
    x?: AttrValue;
    y?: AttrValue;
}

/**
 * VelAdd 
 * - 增加玩家速度指定值.
 * - 正的x方向速度与玩家朝向相同,正的y方向速度指向屏幕下方.
 */
export default function VelAdd(params: VelAddParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = VelAdd\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}