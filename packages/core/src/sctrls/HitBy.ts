import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface HitByParams extends BaseSctrls {
    value?: string;
    value2: string;
    time?: AttrValue;
}

/**
 * HitBy 
 * - 临时指定允许击中玩家的攻击类型.
 */
export default function HitBy(params: HitByParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = HitBy\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}