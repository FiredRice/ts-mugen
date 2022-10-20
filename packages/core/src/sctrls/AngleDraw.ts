import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils/index';

export interface AngleDrawParams extends BaseSctrls {
    /**
     * 设置绘制的角度(角度制表示)
     */
    value?: AttrValue;
    /**
     * 缩放player的sprite(子画面).
     */
    scale?: [AttrValue, AttrValue];
}

/**
 * AngleDraw 
 * 
 * 通过AngleSet控制器绘制玩家(1幅画面)通过自身轴心设置的角度旋转.
 * 
 * 面向右方时,正值表示逆时针方向.
 * 
 * ---
 * **注意：**
 * 
 * **旋转/缩放不会影响player的碰撞块(即红框和蓝框).**
 */
export default function AngleDraw(params: AngleDrawParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = AngleDraw\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}