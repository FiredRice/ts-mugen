import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface PlaySndParams extends BaseSctrls {
    value: [AttrValue, AttrValue];
    volumescale?: AttrValue;
    channel?: AttrValue;
    lowpriority?: AttrValue;
    freqmul?: AttrValue;
    loop?: AttrValue;
    pan?: AttrValue;
    abspan?: AttrValue;
}

/**
 * PlaySnd 
 * - 播放一个声音.
 */
export default function PlaySnd(params: PlaySndParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = PlaySnd\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}