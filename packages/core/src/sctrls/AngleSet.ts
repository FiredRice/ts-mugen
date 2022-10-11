import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils/index';

interface AngleSetParams extends BaseSctrls {
    value?: AttrValue;
}

/**
 * AngleSet 
 * - 设置用于AngleDraw控制器中绘制的旋转角度.角度的初始化值为0
 */
export default function AngleSet(params: AngleSetParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = AngleSet\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}