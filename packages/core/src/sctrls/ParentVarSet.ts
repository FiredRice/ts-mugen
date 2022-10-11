import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface ParentVarSetParams extends BaseSctrls {
    v?: AttrValue;
    fv?: AttrValue;
    value?: AttrValue;
}

/**
 * ParentVarSet 
 * - 如果玩家是一个helper,设置玩家父级(起作用的)变量(var/fvar)数值.
 */
export default function ParentVarSet(params: ParentVarSetParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = ParentVarSet\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}