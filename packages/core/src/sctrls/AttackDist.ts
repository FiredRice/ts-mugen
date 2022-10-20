import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils/index';

export interface AttackDistParams extends BaseSctrls {
    /**
     * 新的防御距离,单位是像素.
     */
    value: AttrValue;
}

/**
 * AttackDist 
 * 
 * 改变玩家当前HitDef中guard.dist参数值.
 * - guard.dist是到P1的X方向距离,在此距离中如果P2控制远离P1的方向则P2将进入防御状态.
 * - guard.dist的效果仅当P1的movetype = A时才体现出来.
 */
export default function AttackDist(params: AttackDistParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = AttackDist\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}