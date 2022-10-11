import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface GameMakeAnimParams extends BaseSctrls {
    value?: AttrValue;
    under?: AttrValue;
    pos?: [AttrValue, AttrValue];
    random?: AttrValue;
}

/**
 * GameMakeAnim 
 * - 创建一个游戏动画,比如一个打击火花或者一个超级冲击效果.
 * - 此控制器已被Explod取代且目前正考虑废弃.
 * - 在未来的版本中也许不会再支持它.
 */
export default function GameMakeAnim(params: GameMakeAnimParams) {
    const { triggers, describe = '', version,...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = GameMakeAnim\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}