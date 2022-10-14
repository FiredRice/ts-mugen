import { currentWrite } from '../core';
import { BaseSctrls, MoveType, StateType } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface StateTypeSetParams extends BaseSctrls {
    /**
     * - A：空中.
     * - C：蹲下.
     * - S：站立.
     * - L：躺下.
     * - 默认不改变.
     */
    statetype?: StateType;
    /**
     * - I：空闲.
     * - H：受击.
     * - A：攻击.
     * - 默认不改变.
     */
    movetype?: MoveType;
    /**
     * 自身的物理属性
     * 
     * - A：空中(受到重力等).
     * - S：站立(受到摩擦力等).
     * - C：蹲下(受到摩擦力等).
     * - N：无属性(不受任何力,可停留在空中).
     */
    physics?: 'S' | 'C' | 'A' | 'N' | 'U';
}

/**
 * StateTypeSet 
 * 
 * 更改当前的状态类型和招式类型.用于从地面进入空中的状态,等等...
 * 
 * 例如一般的升龙,基本可分为地面起身,空中,落地阶段.
 * 
 * 从地面起身过渡到空中的时候就可能用到这个控制器.
 */
export default function StateTypeSet(params: StateTypeSetParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = StateTypeSet\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}