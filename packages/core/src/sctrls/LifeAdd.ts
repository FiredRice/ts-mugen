import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface LifeAddParams extends BaseSctrls {
    value: AttrValue;
    kill?: AttrValue;
    absolute?: AttrValue;
}

/**
 * LifeAdd 
 * - 指定增加玩家生命值的数量,如果有必要,可以被玩家的防御系数缩放.
 */
export default function LifeAdd(params: LifeAddParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = LifeAdd\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}