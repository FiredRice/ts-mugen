import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface OffsetParams extends BaseSctrls {
    x?: AttrValue;
    y?: AttrValue;
}

/**
 * Offset 
 * - 改变玩家的显示位置.玩家通过此数值移动并绘制于他的坐标轴中.
 */
export default function Offset(params: OffsetParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = Offset\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}