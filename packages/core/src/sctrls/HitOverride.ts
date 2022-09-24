import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface HitOverrideParams extends BaseSctrls {
    attr: string;
    stateno: AttrValue;
    slot?: AttrValue;
    time?: AttrValue;
    forceair?: AttrValue;
}

/**
 * HitOverride 
 * - 定义一个hit覆盖.
 * - 如果玩家被指定攻击类型击中,他将进入指定的状态号而不是他默认的受击行为.
 * - 同一时间能有8个覆盖被激活.
 */
export default function HitOverride(params: HitOverrideParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = HitOverride\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}