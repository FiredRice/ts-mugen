import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface MakeDustParams extends BaseSctrls {
    pos?: [AttrValue, AttrValue];
    pos2?: [AttrValue, AttrValue];
    spacing?: AttrValue;
}

/**
 * MakeDust 
 * - 不推荐使用此控制器,请使用Explod控制器.
 * - 制造尘土效果.
 */
export default function MakeDust(params: MakeDustParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = MakeDust\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}