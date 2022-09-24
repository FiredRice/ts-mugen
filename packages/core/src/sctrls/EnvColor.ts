import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface EnvColorParams extends BaseSctrls {
    value?: [AttrValue, AttrValue, AttrValue];
    time?: AttrValue;
    under?: AttrValue;
}

/**
 * EnvColor 
 * - 将整个屏幕变为一种纯色,前景层中打击火花和设置了"ontop"参数的explod除外.
 */
export default function EnvColor(params: EnvColorParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = EnvColor\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}