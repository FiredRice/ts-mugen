import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface PauseParams extends BaseSctrls {
    /**
     * 要暂停的时间帧数.
     * - 有效值是大于0的正数.
     */
    time: AttrValue;
    /**
     * 定义暂停末尾期间的一段时间帧数,在这个时间段里,玩家的招式指令将被缓存起来.
     * 
     * 被缓存的指令将在暂停结束后立刻被command触发器检测.
     * 
     * 缓存仅提供给在暂停中无法移动的玩家.(见movetime参数)
     * 
     * - 有效值为0-t,t是time的参数值(上面的必要参数).
     * - 默认是0.
     */
    endcmdbuftime?: AttrValue;
    /**
     * 定义暂停开始的一段时间帧数,在这个时间段里,玩家被允许移动.
     * 
     * 这段时间内将进行碰撞检测,所以有可能击中其他玩家.
     * 
     * - 有效值为0-t,t是time的参数值(上面的必要参数).
     * - 默认是0.
     */
    movetime?: AttrValue;
    /**
     * 如果设置为1,在暂停中背景将停止.如果是0,背景将在暂停中持续更新.
     * - 默认是1.
     */
    pausebg?: AttrValue;
}

/**
 * Pause 
 * 
 * 将游戏暂停指定的时间.
 * 
 * 在这段时间中,玩家和背景将不会被更新.
 * 
 * ---
 * **注意：**
 * 
 * **在Pause控制器的暂停时间内执行另一个Pause控制器将取消上一个Pause控制器的效果.**
 * 
 * **在SuperPause(超级暂停)中执行Pause控制器将延迟暂停效果直到超级暂停结束.**
 */
export default function Pause(params: PauseParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = Pause\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}