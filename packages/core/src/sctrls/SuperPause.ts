import { currentWrite } from '../core';
import { AttrValue } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';
import { PauseParams } from './Pause';

export interface SuperPauseParams extends Omit<PauseParams, 'time'> {
    /**
     * 指定暂停将持续的时间.
     * - 默认30帧.(默认速度下的半秒)
     */
    time?: AttrValue;
    /**
     * 指定SuperPause期间播放的指定动画号(从fightx.air中).
     * 
     * 如果在anim_no前加上"S",将使用玩家的air文件中动画文件来播放.
     * 
     * 例如,`anim = S10`
     * - 默认是30,那是一个充电效果.(可能就是超必杀前的那种闪光)
     * - 如果动画号是-1,则将不播放动画.
     */
    anim?: AttrValue;
    /**
     * 指定SuperPause期间播放的一个声音(从common.snd).
     * 
     * 如果在snd_grp前加上"S",将使用玩家的snd文件中的声音来播放.
     * 
     * 例如,`anim = S10,0`
     * - 默认是-1,表示不播放任何声音.
     */
    sound?: [AttrValue, AttrValue] | string;
    /**
     * 指定超级闪光将要显示的位置(相对于玩家的坐标轴).
     * - 默认0,0.
     */
    pos?: [AttrValue, AttrValue];
    /**
     * 如果是1,则在SuperPause期间屏幕将变黑(半透明的黑色).
     * 
     * 设置为0无此效果.
     * - 默认值是1.
     */
    darken?: AttrValue;
    /**
     * 此数值用来暂时乘以玩家拥有的任何目标的防御值.
     * 
     * 使一套连招在超级暂停中拥有较少的伤害值.设置为1不改变玩家的防御值.
     * 
     * 0是一个特殊的值,将设置防御值为mugen.cfg中[Rules]中的Super.TargetDefenceMul.
     * - 默认值为0,有效值大于等于0.
     */
    p2defmul?: AttrValue;
    /**
     * 增加给玩家的能量数.
     * - 默认是0.(一般情况超必杀-1000,max超必杀-2000或者减的更多)
     */
    poweradd?: AttrValue;
    /**
     * 如果设置为1,玩家在SuperPause期间将无敌.
     * 
     * 设置为0无此效果.
     * - 默认是1.
     */
    unhittable?: AttrValue;
}

/**
 * SuperPause 
 * 
 * 冻结游戏,使屏幕变黑.当每个玩家被冻结后,他们的time(状态中的时间)将停止.
 * 
 * 用于超级攻击前的突然暂停.
 * 
 * ---
 * **注意：**
 * 
 * **如果之前执行了Pause控制器,且行动还被暂停中,此时执行SuperPasue控制器将抢占Pause控制器的效果.**
 * 
 * **在SuperPause期间,剩下的状态时间要等到Pause控制器效果过期才继续计数.**
 */
export default function SuperPause(params: SuperPauseParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = SuperPause\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}