import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils/index';

export interface BindToRootParams extends BaseSctrls {
    /**
     * 指定绑定的有效时间帧数.
     * - 默认为1.
     */
    time?: AttrValue;
    /**
     * - 如果facing_flag是-1,在绑定期间使玩家总是朝着根级相反的方向.
     * - 如果facing_flag是1,在绑定期间使玩家总是朝着根级相同的方向.
     * - 如果facing_flag是0,在绑定期间无论根级的朝向如何玩家不会转向.
     * - 默认为0.
     */
    facing?: AttrValue;
    /**
     * pos_x和pos_y指定绑定的偏移量(距离根级的坐标轴).
     * - 默认为0,0.
     */
    pos?: [AttrValue, AttrValue];
}

/**
 * BindToRoot 
 * 
 * 如果玩家是一个helper,将这个玩家绑定到相对于他的根级(最顶级)的指定位置
 * 
 * 如果这个玩家不是helper,此控制器无效.
 * 
 * ---
 * **注意：**
 * 
 * **如果玩家的根级被销毁了(例如,如果他是helper,且执行了DestroySelf),则BindToRoot的效果将被终止.**
 */
export default function BindToRoot(params: BindToRootParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = BindToRoot\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}