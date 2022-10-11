import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface StopSndParams extends BaseSctrls {
    channel: AttrValue;
}

/**
 * StopSnd 
 * - 停止指定通道所有播放的声音。
 */
export default function StopSnd(params: StopSndParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = StopSnd\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}