import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface HitAddParams extends BaseSctrls {
    /**
     * 指定增加到当前连击上的打击数字。
     */
    value: AttrValue;
}

/**
 * HitAdd 
 * 
 * 增加当前连击数。
 */
export default function HitAdd(params: HitAddParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = HitAdd\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}