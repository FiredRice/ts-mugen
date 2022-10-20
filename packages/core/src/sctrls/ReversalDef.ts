import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface ReversalDefParams extends BaseSctrls {
    reversal: {
        /**
         * attr_string指定能被ReversalDef反弹的攻击属性列表.是一个标准的hit属性字符串.
         * 
         * 例如,reversal.attr = SA,NA,SA表示 站立+空中, 普通攻击, 特殊攻击.(对手的攻击类型如果包含在列出来的类型内将被反弹) 
         * 
         * (另有字符"A",用来表示All(所有的攻击类型),例如,reversal.attr = S,AT表示 站立,所有投掷类攻击)
         */
        attr: string;
    };
    /**
     * 这是hit时每个玩家将会停止(停顿)的时间(打击停顿,ignorehitpause就是针对这个参数).
     * - p1_pausetime是冻结P1的时间,单位是游戏帧数.
     * - p2_pausetime是在被击中后退前造成P2震动的时间.
     * - 缺省则默认为0,0.
     */
    pausetime?: [AttrValue, AttrValue];
    /**
     * 如果成功击中显示的火花动作号.
     * 
     * 要播放玩家的.air文件之外的火花(fightfx),在动作号前面加上S,
     * 
     * 例如：`sparkno = S10`
     * - 缺省默认为玩家变量中设置的值.(在cns文件[Data]组下面)
     */
    sparkno?: AttrValue;
    /**
     * 在hit时播放的声音(从common.snd中).内置的fight.snd可让你选择从5,0(轻击声音)到5,4(痛苦重击).
     * 
     * 要从玩家自己的SND文件中播放声音,在第一个数字前加上"S".例如,"hitsound = S1,0".
     * - 缺省默认为玩家变量中设置的值.
     */
    hitsound?: [AttrValue, AttrValue] | string;
    /**
     * 如果成功击中,设置P1进入的状态号.这个状态必须是一个攻击状态(movetype = A)且至少要有1帧.
     * 
     * 主要用于投掷.
     * - 默认是-1,不改变.
     */
    p1stateno?: AttrValue;
    /**
     * 如果成功击中,设置P2进入的状态号.P2将获得P1(指定的)状态和动画数据.
     * 
     * P2将保持P1(指定的)状态和动画数据直到P2开始攻击,或者SelfState控制器被使用,返回P2到他自己的状态.
     * 
     * 这个状态必须是一个受击状态(movetype = H)且至少要有1帧.
     * 
     * 主要用于投掷.也可用于自定义攻击反应.
     * - 默认是-1,不改变.
     */
    p2stateno?: AttrValue;
}

/**
 * ReversalDef 
 * 
 * 定义一个攻击反弹.(攻击倒置)
 * 
 * 如果P2的一个Clns1框(红框)与P1的一个Clsn1框(红框)(且此时ReversalDef激活中),则P1将反弹P2的攻击.
 * 
 * 与p1stateno(可选p2stateno)一起使用,创建反弹攻击.
 * 
 * ---
 * 主要用于格挡技能,例如藤堂香澄的招式,刚体等.
 * 
 * 只要你的红框有反弹定义且接触到对手的红框,那么对手的招式就会被你反弹.
 * 
 * 所以,即使你处于无敌状态(比如使用了nothitby或者压根就没有受蓝色击框),也有可能被对手击中而少血,只要对手配合使用了p2stateno.
 * 
 * 当然,此控制器配合p2stateno使用也极易在非整合的MUGEN游戏对战中产生bug,最典型的就是多一个人出来.
 * 
 * 主要是由于ReversalDef反弹了对手的helper攻击,配合p2stateno,指定了对手的helper进入了指定状态.
 * 
 * 所以使用时一定要注意.
 * 
 * ---
 * **注意：**
 * 
 * **sparkxy参数被认为是到P2的hitdef的sparkxy的偏移量.**
 * 
 * **MoveHit触发器能被用来检测如果P1成功反弹了P2招式.**
 */
export default function ReversalDef(params: ReversalDefParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = ReversalDef\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}