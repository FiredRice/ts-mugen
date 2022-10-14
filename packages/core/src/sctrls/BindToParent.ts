import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils/index';

interface BindToParentParams extends BaseSctrls {
    /**
     * 指定绑定的有效时间帧数.
     * - 默认为 1.
     */
    time?: AttrValue;
    /**
     * - 如果 facing 是 -1 ,在绑定期间使玩家总是朝着父级相反的方向.
     * - 如果 facing 是 1 ,在绑定期间使玩家总是朝着父级相同的方向.
     * - 如果 facing 是 0 ,在绑定期间无论父级的朝向如何玩家不会转向.
     * - 默认为 0.
     */
    facing?: AttrValue;
    /**
     * pos_x和pos_y指定绑定的偏移量(距离父级的坐标轴).
     * - 默认为0,0.
     */
    pos?: [AttrValue, AttrValue];
}

/**
 * BindToParent 
 * 
 * 如果玩家是一个helper,将这个玩家绑定到相对于他父级(上一级)的指定位置
 * 
 * 如果这个玩家不是helper,此控制器无效.
 * 
 * ---
 * **注意：**
 * 
 * **如果player的父级被销毁了(例如,如果父级是helper,且执行了DestroySelf),则BindToParent的效果将被终止.**
 */
export default function BindToParent(params: BindToParentParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = BindToParent\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}