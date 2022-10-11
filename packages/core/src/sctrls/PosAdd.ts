import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface PosAddParams extends BaseSctrls {
    x?: AttrValue;
    y?: AttrValue;
}

/**
 * PosAdd 
 * - 玩家位置的指定偏移量.
 * - X坐标相对于玩家的坐标轴,正值向玩家所朝的方向移动.
 * - Y坐标相对于玩家的坐标轴,负值向上移动.
 */
export default function PosAdd(params: PosAddParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = PosAdd\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}