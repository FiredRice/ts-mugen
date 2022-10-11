import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils/index';

interface AngleMulParams extends BaseSctrls {
    value?: AttrValue;
}

/**
 * AngleMul 
 * - 用于AngleDraw控制器绘制的旋转角度乘以指定因数.
 */
export default function AngleMul(params: AngleMulParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = AngleMul\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}