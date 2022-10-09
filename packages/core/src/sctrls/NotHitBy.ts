import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface NotHitByParams extends BaseSctrls {
    value?: AttrValue;
    value2?: AttrValue;
    time?: AttrValue;
}

/**
 * NotHitBy 
 * - 临时指定无法击中玩家的hit类型.
 */
export default function NotHitBy(params: NotHitByParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = NotHitBy\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}