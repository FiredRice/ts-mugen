import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface WidthParams extends BaseSctrls {
    edge?: [AttrValue, AttrValue];
    player?: [AttrValue, AttrValue];
    value?: [AttrValue, AttrValue];
}

/**
 * Width 
 * - 1帧内暂时改变玩家的宽度尺寸.
 * - 当玩家与另一个人接触或与版边接触时用于控制"推挤"的特征.
 */
export default function Width(params: WidthParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = Width\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}