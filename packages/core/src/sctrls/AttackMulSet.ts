import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils/index';

interface AttackMulSetParams extends BaseSctrls {
    /**
     * 指定所需的乘数.例如,attack_mul设置为2表示2倍伤害值.
     */
    value: AttrValue;
}

/**
 * AttackMulSet 
 * 
 * 设置玩家的攻击系数.玩家的任何伤害值都会按此系数缩放
 */
export default function AttackMulSet(params: AttackMulSetParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = AttackMulSet\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}