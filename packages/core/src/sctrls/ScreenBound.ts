import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface ScreenBoundParams extends BaseSctrls {
    value?: AttrValue;
    movecamera?: [AttrValue, AttrValue];
}

/**
 * ScreenBound 
 * - 指定玩家的运动是否被屏幕约束.
 * - 也决定着摄像机是否应该跟随玩家运动.
 * - 此控制器产生的结果只在1帧内有效.
 */
export default function ScreenBound(params: ScreenBoundParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = ScreenBound\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}