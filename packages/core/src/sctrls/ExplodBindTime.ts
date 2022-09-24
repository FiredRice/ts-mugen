import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface ExplodBindTimeParams extends BaseSctrls {
    ID?: AttrValue;
    time?: AttrValue;
    value?: AttrValue;
}

/**
 * ExplodBindTime 
 * - 改变玩家的explod位置绑定时间.
 */
export default function ExplodBindTime(params: ExplodBindTimeParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = ExplodBindTime\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}