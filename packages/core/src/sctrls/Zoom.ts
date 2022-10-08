import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface ZoomParams extends BaseSctrls {
    scale?: AttrValue;
    pos?: [AttrValue, AttrValue];
    facing?: AttrValue;
}

/**
 * Zoom 
 */
export default function Zoom(params: ZoomParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = Zoom\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}