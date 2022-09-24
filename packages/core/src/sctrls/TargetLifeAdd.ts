import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface TargetLifeAddParams extends BaseSctrls {
    value: AttrValue;
    ID?: AttrValue;
    kill?: AttrValue;
    absolute?: AttrValue;
}

/**
 * TargetLifeAdd 
 * - 增加目标生命值指定的数量,必要的话此数量会被目标的防御系数缩放.
 */
export default function TargetLifeAdd(params: TargetLifeAddParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = TargetLifeAdd\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}