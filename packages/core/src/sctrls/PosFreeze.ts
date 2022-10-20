import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface PosFreezeParams extends BaseSctrls {
    /**
     * 如果value非0,则玩家的位置将被冻结,否则不会.
     * - 默认为1.
     */
    value: AttrValue;
}

/**
 * PosFreeze 
 * 
 * 临时冻结玩家的位置.
 */
export default function PosFreeze(params: PosFreezeParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = PosFreeze\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}