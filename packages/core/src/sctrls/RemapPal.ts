import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface RemapPalParams extends BaseSctrls {
    source: [AttrValue, AttrValue];
    dest: [AttrValue, AttrValue];
}

/**
 * RemapPal 
 * - 更换玩家的色表.
 */
export default function RemapPal(params: RemapPalParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = RemapPal\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}