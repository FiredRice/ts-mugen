import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface ScreenBoundParams extends BaseSctrls {
    /**
     * - 如果是0,玩家将被允许离开屏幕.
     * - 如果是1,则玩家将被约束在屏幕内.
     * - 缺省默认是0.
     */
    value?: AttrValue;
    /**
     * 如果是1,指定摄像机应该跟随玩家分别在x和y方向平移.
     * - 缺省默认都为0.
     */
    movecamera?: [AttrValue, AttrValue];
}

/**
 * ScreenBound 
 * 
 * 指定玩家的运动是否被屏幕约束.
 * 
 * 也决定着摄像机是否应该跟随玩家运动.
 * 
 * 此控制器产生的结果只在1帧内有效.
 * 
 * ---
 * 实例:
 * ```
 * [State 0, ScreenBound]
 * type = ScreenBound
 * trigger1 = 1
 * value = 1
 * movecamera = 0,0
 * ```
 * 不允许人物离开屏幕也不允许镜头随人物移动
 * 
 * 有时候也可以搭配width使用
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