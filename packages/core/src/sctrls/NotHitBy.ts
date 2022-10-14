import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface NotHitByParams extends BaseSctrls {
    /**
     * value 与 value2 只有1种能被指定.
     * 
     * attr_string应是1个标准的hit属性字符串.
     */
    value?: AttrValue;
    /**
     * value 与 value2 只有1种能被指定.
     * 
     * attr_string应是1个标准的hit属性字符串.
     */
    value2?: AttrValue;
    /**
     * 指定NotHitBy属性起作用的游戏帧数.
     * - 默认是1.
     */
    time?: AttrValue;
}

/**
 * NotHitBy 
 * 
 * 临时指定无法击中玩家的hit类型.
 * 
 * ---
 * 详情：
 * 
 * 玩家有2个hit属性槽,能用"value"或"value2"的值来设置给NotHitBy控制器.
 * 
 * 这些槽也能被HitBy控制器设置.当设置了1个槽,便获得了一个朝0倒记的计时器.(有效时间)
 * 
 * 如果计时器还未计时到0,槽被认为是激活的.玩家能被HitDef击中仅当HitDef中的参数出现在所有当前激活的槽中.
 * 
 * 使用NotHitBy控制器设置指定的槽来包含所有hit属性,除了那些被指定在NotHitBy属性字符串中的.
 * 
 * ---
 * 示例:
 * ```
 * ; 所有攻击都不能击中
 * trigger1 = 1
 * type = NotHitBy
 * value = SCA
 * 
 * ; 不被普通攻击和所有飞行道具击中
 * trigger1 = 1
 * type = NotHitBy
 * value = , NA, AP
 * ; 不写就表示SCA
 * ```
 * ---
 * **注意：**
 * 
 * **目前来看,这个控制器的BUG还是没有修复.而且通过几次测试,也无法描述出bug的规律.**
 * 
 * **貌似只有第一组属性槽(SCA)省略,才有效.比如value = ,NA表示对普通攻击免疫,这貌似是准确的.**
 * 
 * **只要写上SCA就会导致所有攻击都无效.其他还有很多的bug,无法用规律描述出来.比如本人试出来 value = S,NA会导致飞行道具无法击中等等.**
 * 
 * **总之要实现不让部分招式击中,还是要使用HitBy.**
 */
export default function NotHitBy(params: NotHitByParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = NotHitBy\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}