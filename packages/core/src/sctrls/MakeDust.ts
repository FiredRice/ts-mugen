import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface MakeDustParams extends BaseSctrls {
    /**
     * 指定尘土被画出的位置,相对于玩家的坐标轴.
     * - 默认是0,0.
     */
    pos?: [AttrValue, AttrValue];
    /**
     * 指定同时画出的第2个尘土的位置.
     * - 若缺省,则第2个尘土将不会被画出.
     */
    pos2?: [AttrValue, AttrValue];
    /**
     * 确定绘制尘土的时间间隔.
     * 
     * 例如,spacing = 3(默认值)将每隔3帧绘制一个新的尘土效果.
     * - spacing的值应大于等于1.
     */
    spacing?: AttrValue;
}

/**
 * MakeDust 
 * 
 * 不推荐使用此控制器,请使用Explod控制器.
 * 
 * 制造尘土效果.
 * 
 * ---
 * 注：此控制器直接调用fightfx内动画号为120的动画.
 */
export default function MakeDust(params: MakeDustParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = MakeDust\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}