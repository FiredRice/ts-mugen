import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface HitByParams extends BaseSctrls {
    /**
     * value 与 value2 只有1种能被指定.
     * 
     * value 应该是一个标准的攻击属性字符串.
     * 
     * 在HitBy控制器中,玩家有2个能被设定且运用的攻击属性槽value 或 value2.这些属性槽也能被NotHitBy控制器设定.
     * 
     * 当设置了一个属性槽,便会获得一个计时器(有效的时间),此计时器会朝0倒计时.
     * 
     * 计时到0之前属性槽被认为是激活的.
     * 
     * 仅当Hitdef的(attr)属性出现在当前所有激活的属性槽中,玩家才能被此HitDef击中.
     * 
     * 使用HitBy控制器设置指定的属性槽包含仅那些出现在HitBy属性字符串中的攻击属性.
     */
    value?: string;
    /**
     * value 与 value2 只有1种能被指定.
     * 
     * value2 应该是一个标准的攻击属性字符串.
     * 
     * 在HitBy控制器中,玩家有2个能被设定且运用的攻击属性槽value 或 value2.这些属性槽也能被NotHitBy控制器设定.
     * 
     * 当设置了一个属性槽,便会获得一个计时器(有效的时间),此计时器会朝0倒计时.
     * 
     * 计时到0之前属性槽被认为是激活的.
     * 
     * 仅当Hitdef的(attr)属性出现在当前所有激活的属性槽中,玩家才能被此HitDef击中.
     * 
     * 使用HitBy控制器设置指定的属性槽包含仅那些出现在HitBy属性字符串中的攻击属性.
     */
    value2?: string;
    /**
     * 指定HitBy属性有效的时间帧数.
     * - 默认为1.
     */
    time?: AttrValue;
}

/**
 * HitBy 
 * 
 * 临时指定允许击中玩家的攻击类型.
 * 
 * 示例：
 * ```
 * ; 仅能被站立普通攻击击中.
 * trigger1 = 1
 * type = HitBy
 * value = S, NA
 * ```
 */
export default function HitBy(params: HitByParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = HitBy\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}