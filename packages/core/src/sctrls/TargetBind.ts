import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface TargetBindParams extends BaseSctrls {
    /**
     * 指定绑定起作用的时间帧数.
     * - 默认是1.
     */
    time?: AttrValue;
    /**
     * 指定要绑定的目标ID号.只有符合此ID号的目标才会被绑定.
     * - 默认为-1.(绑定所有的目标)
     */
    ID?: AttrValue;
    /**
     * 指定玩家坐标轴到绑定目标的偏移量.
     * - 缺省默认是0,0.
     */
    pos?: [AttrValue, AttrValue];
}

/**
 * TargetBind 
 * 
 * 把玩家指定目标绑定到指定的玩家坐标轴相对位置.
 * 
 * ---
 * 注：TargetBind是把目标绑定到你身上,BindToTarget是把你绑定到目标身上.
 */
export default function TargetBind(params: TargetBindParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = TargetBind\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}