import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface OffsetParams extends BaseSctrls {
    /**
     * 指定x的偏移量.
     */
    x?: AttrValue;
    /**
     * 指定y的偏移量.
     */
    y?: AttrValue;
}

/**
 * Offset 
 * 
 * 改变玩家的显示位置.玩家通过此数值移动并绘制于他的坐标轴中.
 */
export default function Offset(params: OffsetParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = Offset\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}