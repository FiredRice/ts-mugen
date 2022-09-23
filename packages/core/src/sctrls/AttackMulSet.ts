import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface AttackMulSetParams extends BaseSctrls {
    value?: AttrValue;
}

/**
 * AttackMulSet 
 * - 设置玩家的攻击系数.玩家的任何伤害值都会按此系数缩放
 */
export default function AttackMulSet(params: AttackMulSetParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = AttackMulSet\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}