import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils/index';

interface AngleDrawParams extends BaseSctrls {
    value?: AttrValue;
    scale?: [AttrValue, AttrValue];
}

/**
 * AngleDraw 
 * - 通过AngleSet控制器绘制玩家(1幅画面)通过自身轴心设置的角度旋转.
 * - 面向右方时,正值表示逆时针方向.
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