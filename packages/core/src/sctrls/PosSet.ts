import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface PosSetParams extends BaseSctrls {
    /**
     * 指定玩家新的x方向位置.
     */
    x?: AttrValue;
    /**
     * 指定玩家新的y方向位置.
     */
    y?: AttrValue;
}

/**
 * PosSet 
 * 
 * 设置玩家的位置到指定的坐标.
 * 
 * X坐标相对于屏幕中心,正值向右移动.
 * 
 * Y坐标相对于地面,负值向上移动.
 */
export default function PosSet(params: PosSetParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = PosSet\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}