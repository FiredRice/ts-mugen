import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface SprPriorityParams extends BaseSctrls {
    /**
     * - 默认值是-5到5.
     */
    value: AttrValue;
}

/**
 * SprPriority 
 * 
 * 改变玩家图像的优先级(也可理解为图层).高优先级的图像绘制在低优先级图像上方.
 */
export default function SprPriority(params: SprPriorityParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = SprPriority\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}