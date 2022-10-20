import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface GameMakeAnimParams extends BaseSctrls {
    /**
     * 指定要播放的动画号(从fightfx中).
     * - 默认是0.
     */
    value?: AttrValue;
    /**
     * 如果under_flag是1,动画将绘制在人物图层下方.
     * - 默认是0.(绘制在人物上方)
     */
    under?: AttrValue;
    /**
     * 指定动画被显示的位置,相对于玩家的坐标轴.
     * - 默认是0,0.
     */
    pos?: [AttrValue, AttrValue];
    /**
     * 
     * 动画的位置将被x和y方向的(不同)随机数替代.
     * 
     * 这种替换和rand_amt的一半一样大.(可能指的是:如果pos = 0,0;random = 10,则动画实际出现的x和y位置均在-5~5之内)
     * - 默认是0.
     */
    random?: AttrValue;
}

/**
 * GameMakeAnim 
 * 
 * 创建一个游戏动画,比如一个打击火花或者一个超级冲击效果.
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