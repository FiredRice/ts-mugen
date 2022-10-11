import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils/index';

interface DefenceMulSetParams extends BaseSctrls {
    value: AttrValue;
}

/**
 * DefenceMulSet 
 * - 设置玩家的防御系数.玩家受到的所有伤害将会按此系数缩放.
 */
export default function DefenceMulSet(params: DefenceMulSetParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = DefenceMulSet\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}