import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface SuperPauseParams extends BaseSctrls {
    time?: AttrValue;
    anim?: AttrValue;
    sound?: [AttrValue, AttrValue];
    pos?: [AttrValue, AttrValue];
    darken?: AttrValue;
    p2defmul?: AttrValue;
    poweradd?: AttrValue;
    unhittable?: AttrValue;
}

/**
 * SuperPause 
 * - 冻结游戏,使屏幕变黑.当每个玩家被冻结后,他们的time(状态中的时间)将停止.
 * - 用于超级攻击前的突然暂停.
 */
export default function SuperPause(params: SuperPauseParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = SuperPause\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}