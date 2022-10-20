import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface PosAddParams extends BaseSctrls {
    /**
     * 使玩家向前移动x_value像素.
     * - 默认是0.
     */
    x?: AttrValue;
    /**
     * 使玩家向下移动y_value像素.
     * - 默认是0.
     */
    y?: AttrValue;
}

/**
 * PosAdd 
 * 
 * 玩家位置的指定偏移量.
 * 
 * X坐标相对于玩家的坐标轴,正值向玩家所朝的方向移动.
 * 
 * Y坐标相对于玩家的坐标轴,负值向上移动.
 * 
 * ---
 * 特例:
 * 
 * 此控制器来用来模拟打击停顿时的人物颤动效果:
 * ```
 * [State 0, PosAdd]
 * type = PosAdd
 * trigger1 = time%2 = 0
 * x = 1
 * 
 * [State 0, PosAdd]
 * type = PosAdd
 * trigger1 = time%2 = 1
 * x = -1
 * ```
 * 也能实现不规则颤动效果:
 * - 先用有固定效果的控制器固定位置
 * ```
 * [State 0, PosSet]
 * type = PosSet
 * trigger1 = 1
 * x = 20
 * y = 15
 * ```
 * - 添加颤动效果
 * ```
 * [State 0, PosAdd]
 * type = PosAdd
 * trigger1 = 1
 * x = -2+Random%5
 * y = -2+Random%5
 * ```
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