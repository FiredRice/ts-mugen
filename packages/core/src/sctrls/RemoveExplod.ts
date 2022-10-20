import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface RemoveExplodParams extends BaseSctrls {
    /**
     * 要移除的explod的ID号.
     * - 如果缺省,将移除玩家拥有的所有explod.
     */
    ID?: AttrValue;
}

/**
 * RemoveExplod 
 * 
 * 移除玩家所有的explod或者只是指定ID号的explod.
 */
export default function RemoveExplod(params: RemoveExplodParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = RemoveExplod\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}