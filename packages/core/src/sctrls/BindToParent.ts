import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface BindToParentParams extends BaseSctrls {
    time?: AttrValue;
    facing?: AttrValue;
    pos?: [AttrValue, AttrValue];
}

/**
 * BindToParent 
 * - 如果玩家是一个helper,将这个玩家绑定到相对于他父级(上一级)的指定位置
 */
export default function BindToParent(params: BindToParentParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = BindToParent\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}