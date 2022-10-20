import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface LifeAddParams extends BaseSctrls {
    /**
     * 指定增加到玩家血条上的生命值.
     */
    value: AttrValue;
    /**
     * 如果kill_flag是0,则增加量不会使玩家的生命值低于1.
     * - 默认是1.
     */
    kill?: AttrValue;
    /**
     * 如果abs_flag是1,则精确的add_amt数值将增加到玩家的生命中(忽略防御系数).
     * - 默认是0.
     */
    absolute?: AttrValue;
}

/**
 * LifeAdd 
 * 
 * 指定增加玩家生命值的数量,如果有必要,可以被玩家的防御系数缩放.
 */
export default function LifeAdd(params: LifeAddParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = LifeAdd\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}