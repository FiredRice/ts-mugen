import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface HitFallSetParams extends BaseSctrls {
    /**
     * 如果fallset_flag是-1,则此控制器不会改变玩家是否将要下落.
     * 
     * 如果fallset_flag是0,意味着玩家将不进入下落状态,1表示将进入下落状态.
     * - 默认值为-1.
     */
    value?: AttrValue;
    /**
     * 若指定,设置玩家的fall.xvel参数.
     * 
     * 详见HitDef对这些参数的描述.
     */
    xvel?: AttrValue;
    /**
     * 若指定,设置玩家的fall.yvel参数.
     * 
     * 详见HitDef对这些参数的描述.
     */
    yvel?: AttrValue;
}

/**
 * HitFallSet 
 * 
 * 当玩家被击中,设置玩家的下落变量.
 * 
 * ---
 * 特例：可作为特殊效果使用,比如对方空中被冰冻着地后再被非fall攻击不会被击飞.
 * ```
 * [State 0, HitFallSet]
 * type = HitFallSet
 * trigger1 = time = 0
 * value = 0
 * ```
 */
export default function HitFallSet(params: HitFallSetParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = HitFallSet\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}