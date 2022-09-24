import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface SndPanParams extends BaseSctrls {
    channel?: AttrValue;
    pan?: AttrValue;
    abspan?: AttrValue;
}

/**
 * SndPan 
 * - 调整当前播放声音的相位(平移).
 * - 此控制器也许能通过持续触发的方式来实现平稳移动一个声音穿过音场或者使声音跟随玩家移动.
 */
export default function SndPan(params: SndPanParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = SndPan\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}