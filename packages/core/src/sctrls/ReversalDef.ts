import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface ReversalDefParams extends BaseSctrls {
    pausetime?: [AttrValue, AttrValue];
    sparkno?: AttrValue;
    hitsound?: [AttrValue, AttrValue];
    p1stateno?: AttrValue;
    p2stateno?: AttrValue;
    reversal?: {
        attr?: string;
    };
}

/**
 * ReversalDef 
 * - 定义一个攻击反弹.(攻击倒置)
 */
export default function ReversalDef(params: ReversalDefParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = ReversalDef\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}