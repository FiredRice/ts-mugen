import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface PlaySndParams extends BaseSctrls {
    /**
     * group_no和sound_no对应你在玩家的snd文件中给每个声音指定的一对识别码.
     * 
     * 如果要从common.snd中播放声音,在group_no前加上"F".
     */
    value: [AttrValue, AttrValue] | string;
    /**
     * volume_scale控制音量.数值为100表示音量为100%,50为50%,等等.
     * - 有效值从0-100.
     * - 默认为100.
     */
    volumescale?: AttrValue;
    /**
     * 指定哪个声音通道将播放声音.一个特定通道在同一时间也许只能播放一个声音.
     * 
     * 例如,如果你在通道2播放一个声音,然后在第一个声音播放后相同的通道播放任何声音,则默认第一个声音在第二个声音播放时将停止.
     * 
     * 通道0是预留给玩家的特殊通道,当玩家被击中时通道0的声音(说话声)将停止.
     * 
     * 建议你在通道0播放你人物的(说话声)声音.
     * - 缺省默认为-1,表示声音将在任何空闲的声道播放.
     */
    channel?: AttrValue;
    /**
     * 此参数仅在通道不是-1的时候有效.
     * 
     * 如果pr非0,则当前在此通道播放的声音(从上一个PlaySnd中调用)不能被此声音打断.
     */
    lowpriority?: AttrValue;
    /**
     * 声音频率将乘以f.
     * 
     * 例如.设置f为1.1将造成高分贝的声音.
     * - 默认为1.0(不改变频率).
     */
    freqmul?: AttrValue;
    /**
     * 设置为非0使得声音样本反复循环.
     * - 默认是0.
     */
    loop?: AttrValue;
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
 * PlaySnd 
 * 
 * 播放一个声音.
 * 
 * ---
 * 示例:
 * ```
 * ; 从玩家的SND文件中播放声音2,0.
 * type = PlaySnd
 * value = 2,0
 * 
 * ; 从fight.snd中播放声音5,2.
 * type = PlaySnd
 * value = F5,2
 * ```
 * ---
 * **注意：**
 * 
 * **1.0 RC8 版本之前,volume参数用来取代volumescale.**
 * 
 * **volume参数不再被使用.**
 */
export default function PlaySnd(params: PlaySndParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = PlaySnd\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}