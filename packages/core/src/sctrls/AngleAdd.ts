import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface AngleAddParams extends BaseSctrls {
    value?: AttrValue;
}

/**
 * AngleAdd 
 * - 用于AngleDraw控制器,增加绘制的角度.
 */
export default function AngleAdd(params: AngleAddParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = AngleAdd\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}