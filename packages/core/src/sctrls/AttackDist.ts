import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface AttackDistParams extends BaseSctrls {
    value?: AttrValue;
}

/**
 * AttackDist 
 * - 改变玩家当前HitDef中guard.dist参数值.
 */
export default function AttackDist(params: AttackDistParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = AttackDist\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}