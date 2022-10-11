import { currentWrite } from '../core';
import { AttrValue, BaseSctrls, TransType } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface TransParams extends BaseSctrls {
    trans: TransType;
    alpha?: [AttrValue, AttrValue];
}

/**
 * Trans 
 * - 覆盖玩家当前游戏帧动画的透明度参数.用于特效中.
 */
export default function Trans(params: TransParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = Trans\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}