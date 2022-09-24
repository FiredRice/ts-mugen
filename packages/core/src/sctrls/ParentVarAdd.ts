import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface ParentVarAddParams extends BaseSctrls {
    v?: AttrValue;
    fv?: AttrValue;
    value?: AttrValue;
}

/**
 * ParentVarAdd 
 * - 如果玩家是一个helper,增加玩家父级一个(起作用的)变量(var/fvar)数值.
 */
export default function ParentVarAdd(params: ParentVarAddParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = ParentVarAdd\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}