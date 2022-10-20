import { currentWrite } from '../core';
import { AttrValue, BaseSctrls, TransType } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface TransParams extends BaseSctrls {
    /**
     * - default：没有效果
     * - none：禁用透明效果
     * - add：完全透明叠加效果 
     * - addalpha：自定义透明叠加效果(必须指定alpha参数) 
     * - add1：alpha在256,128时的透明叠加效果
     * - sub：透明差值效果
     */
    trans: TransType;
    /**
     * alpha = source_alpha, dest_alpha (整型,整型) 
     * 
     * 这是addalpha透明类型中alpha的 source(源) 和 destination(目标) 数值.
     * - 有效值从0(低)到256(高).
     * - 缺省默认是256,0.(同air中的ASXXDXX.AS D 就是这个参数的缩写.)
     */
    alpha?: [AttrValue, AttrValue];
}

/**
 * Trans 
 * 
 * 覆盖玩家当前游戏帧动画的透明度参数.用于特效中.
 * 
 * ---
 * 示例:
 * ```
 * ; 256帧内人物渐入. 
 * type = Trans
 * trigger1 = time < 256
 * trans = add_alpha
 * alpha = time, 256-time 
 * ```
 * ---
 * 有很多表达式会用到time来实现一些渐变过渡效果,如果实在不明白什么含义,建议依次将几个数值代入time,然后寻找一下规律
 */
export default function Trans(params: TransParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = Trans\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}