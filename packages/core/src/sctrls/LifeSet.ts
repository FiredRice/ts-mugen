import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface LifeSetParams extends BaseSctrls {
    /**
     * 指定执行(lifeset)后玩家将会获得的生命值.
     */
    value: AttrValue;
}

/**
 * LifeSet 
 * 
 * 把玩家的生命值设置为指定的值.
 */
export default function LifeSet(params: LifeSetParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = LifeSet\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}