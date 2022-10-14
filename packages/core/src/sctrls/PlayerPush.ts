import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface PlayerPushParams extends BaseSctrls {
    /**
     * - 如果push_flag非0,则能够进行推挤检测.
     * - 如果push_flag是0,则停止推挤检测.
     */
    value: AttrValue;
}

/**
 * PlayerPush 
 * 
 * 停止1帧之内玩家的推挤检测.推挤检测用于防止玩家相互重叠.
 * 
 * 通过暂时停止推挤检测,dodge(闪避)类型的招式(玩家能穿过另一个人,但是仍然能被击中)能被实现.
 */
export default function PlayerPush(params: PlayerPushParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = PlayerPush\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}