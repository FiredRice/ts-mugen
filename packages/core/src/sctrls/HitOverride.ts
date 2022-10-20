import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface HitOverrideParams extends BaseSctrls {
    /**
     * 标准hit属性字符串指定了要覆盖的hit类型.
     * 
     * 见Hitdef中"attr"参数章节.
     */
    attr: string;
    /**
     * 指定如果被Hitdef且指定的属性击中后将要进入的状态.
     */
    stateno: AttrValue;
    /**
     * 指定放置击中覆盖的一个插槽号(0到7).
     * - 缺省默认是0.
     */
    slot?: AttrValue;
    /**
     * 指定此击中覆盖应激活的时间.
     * 
     * 设置为-1使得此覆盖一直持续直到被另一个覆盖.
     * - 默认是1(1帧).
     */
    time?: AttrValue;
    /**
     * 若设置成1,玩家的受击变量将被设置成仿佛击中时进入了空中状态.
     * 
     * 用于如果你想强制玩家被任何hit击中便摔倒.
     */
    forceair?: AttrValue;
}

/**
 * HitOverride 
 * 
 * 定义一个hit覆盖.
 * 
 * 如果玩家被指定攻击类型击中,他将进入指定的状态号而不是他默认的受击行为.
 * 
 * 同一时间能有8个覆盖被激活.
 * 
 * ---
 * **注意:**
 * 
 * **如果P1有大于等于1个激活的HitOverrides,P1将不会被P2拥有的下列任何特征匹配的HitDef影响：**
 * - **p1stateno参数值不是-1.**
 * - **p2getp1state参数值是1.**
 */
export default function HitOverride(params: HitOverrideParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = HitOverride\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}