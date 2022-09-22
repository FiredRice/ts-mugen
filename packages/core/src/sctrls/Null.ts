import { currentWrite } from '../core';
import { BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface NullParams extends BaseSctrls {
}

/**
 * Null 
 * - 什么也不做
 */
export default function Null(params: NullParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = Null\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}