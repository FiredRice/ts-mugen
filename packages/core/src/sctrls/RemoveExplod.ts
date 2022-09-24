import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface RemoveExplodParams extends BaseSctrls {
    ID?: AttrValue;
}

/**
 * RemoveExplod 
 * - 移除玩家所有的explod或者只是指定ID号的explod.
 */
export default function RemoveExplod(params: RemoveExplodParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = RemoveExplod\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}