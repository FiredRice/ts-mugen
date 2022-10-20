import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface SndPanParams extends BaseSctrls {
    /**
     * 指定要移动声音的声道号.
     */
    channel: AttrValue;
    /**
     * 声音(音源)的位置偏移,计量单位是像素.
     * 
     * 如果p>0则声音偏移到玩家的前方.如果p<0则声音偏移到玩家的后方.
     * 
     * 这个参数与abspan是互斥的.
     * 
     * (也就是说如果pan=1000,那么即使你人站在左边脸朝右,你的声音听起来也是从右面播放出来的.)
     * - 默认为0.
     */
    pan?: AttrValue;
    /**
     * 和pan一样,只是声音从屏幕中心开始平移,而不是从玩家的位置.
     * 
     * 这个参数与pan是互斥的.
     */
    abspan?: AttrValue;
}

/**
 * SndPan 
 * 
 * 调整当前播放声音的相位(平移).
 * 
 * 此控制器也许能通过持续触发的方式来实现平稳移动一个声音穿过音场或者使声音跟随玩家移动.
 */
export default function SndPan(params: SndPanParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = SndPan\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}