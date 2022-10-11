import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface PauseParams extends BaseSctrls {
    time: AttrValue;
    endcmdbuftime?: AttrValue;
    movetime?: AttrValue;
    pausebg?: AttrValue;
}

/**
 * Pause 
 * - 将游戏暂停指定的时间.
 * - 在这段时间中,玩家和背景将不会被更新.
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