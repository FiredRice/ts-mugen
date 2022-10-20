import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils/index';

export interface DefenceMulSetParams extends BaseSctrls {
    /**
     * 指定的防御系数.
     */
    value: AttrValue;
}

/**
 * DefenceMulSet 
 * 
 * 设置玩家的防御系数.玩家受到的所有伤害将会按此系数缩放.
 * 
 * ---
 * 示例：
 * ```
 * ; 玩家受到的所有伤害减半.
 * type = DefenceMulSet
 * value = .5
 * ```
 * ---
 * **注意：**
 * 
 * **LifeAdd控制器不会被玩家的防御系数影响.**
 */
export default function DefenceMulSet(params: DefenceMulSetParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = DefenceMulSet\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}