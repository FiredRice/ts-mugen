import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface VelSetParams extends BaseSctrls {
    x?: AttrValue;
    y?: AttrValue;
}

/**
 * VelSet 
 * - 设置玩家速度为指定值.
 * - 正的x方向速度与玩家朝向相同,正的y方向速度指向屏幕下方.
 */
export default function VelSet(params: VelSetParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = VelSet\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}