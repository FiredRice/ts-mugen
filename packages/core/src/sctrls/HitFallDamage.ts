import { currentWrite } from '../core';
import { BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface HitFallDamageParams extends BaseSctrls {
}

/**
 * HitFallDamage 
 * - 当玩家被击中且进入fall状态,提供fall的伤害值(在hitdef中指定的).
 */
export default function HitFallDamage(params: HitFallDamageParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = HitFallDamage\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}