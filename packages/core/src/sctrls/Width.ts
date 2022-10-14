import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface WidthParams extends BaseSctrls {
    /**
     * 设置玩家前后的edge宽度.edge宽度决定了玩家能有多接近屏幕的边缘.
     * - 默认值为0,0.
     */
    edge?: [AttrValue, AttrValue];
    /**
     * 设置玩家前后的player宽度.player宽度决定了玩家能有多接近其他玩家.
     * - 默认值为0,0.
     */
    player?: [AttrValue, AttrValue];
    /**
     * 这是同时设置边缘宽度和玩家宽度的速记语法.
     * 
     * 这些也许仅被使用在edge和player参数没有指定的时候.
     */
    value?: [AttrValue, AttrValue];
}

/**
 * Width 
 * 
 * 1帧内暂时改变玩家的宽度尺寸.
 * 
 * 当玩家与另一个人接触或与版边接触时用于控制"推挤"的特征.
 * 
 * ---
 * **注意：**
 * 
 * **当显示碰撞块时,设置的edge宽度条显示为橙色,玩家的宽度条显示为黄色.**
 * 
 * **当它们重叠时,重叠的区域显示为亮黄色.**
 */
export default function Width(params: WidthParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = Width\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}