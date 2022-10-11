import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface TargetBindParams extends BaseSctrls {
    time?: AttrValue;
    ID?: AttrValue;
    pos?: [AttrValue, AttrValue];
}

/**
 * TargetBind 
 * - 把玩家指定目标绑定到指定的玩家坐标轴相对位置.
 */
export default function TargetBind(params: TargetBindParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = TargetBind\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}