import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface BindToRootParams extends BaseSctrls {
    time?: AttrValue;
    facing?: AttrValue;
    pos?: [AttrValue, AttrValue];
}

/**
 * BindToRoot 
 * - 如果玩家是一个helper,将这个玩家绑定到相对于他的根级(最顶级)的指定位置
 */
export default function BindToRoot(params: BindToRootParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = BindToRoot\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}