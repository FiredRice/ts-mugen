import { currentWrite } from '../core';
import { BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils/index';

type SpecialFlag =
    | 'intro'
    | 'invisible'
    | 'roundnotover'
    | 'nobardisplay'
    | 'noBG'
    | 'noFG'
    | 'nostandguard'
    | 'nocrouchguard'
    | 'noairguard'
    | 'noautoturn'
    | 'nojugglecheck'
    | 'nokosnd'
    | 'nokoslow'
    | 'noshadow'
    | 'globalnoshadow'
    | 'nomusic'
    | 'nowalk'
    | 'timerfreeze'
    | 'unguardable';

interface AssertSpecialParams extends BaseSctrls {
    /**
     * 断言标示
     * - intro 告诉MUGEN人物正在表演开场姿势.开场时(该标示)必须每帧都被断言.
     * - invisible 断言后人物变的不可见.不会影响显示的残影.
     * - roundnotover 告诉MUGEN人物正在表演胜利姿势.胜利时(此标示)每帧都该被断言.
     * - nobardisplay 当断言后,血条,能量条等等将不被显示.
     * - noBG 关闭背景,屏幕被清黑.
     * - noFG 无法显示舞台的1号图层.
     * - nostandguard 断言期间,人物将不能站立防御
     * - nocrouchguard 断言期间,人物将不能蹲下防御.
     * - noairguard 断言期间,人物将不能空中防御.
     * - noautoturn 断言期间,阻止人物自动转向对手.
     * - nojugglecheck 断言期间,juggle(连击数)将不会被检测.无论连击点数是多少,P2都能被连击.
     * - nokosnd 阻止已被击败的玩家播放11,0号声音(被KO的声音).对于拥有KO回声设定的玩家来说,为了压制住各种回声效果,nokosnd必须在玩家被KO之后断言大于等于50个帧数.
     * - nokoslow 断言期间,阻止MUGEN用慢动作显示一局的结束.
     * - noshadow 断言期间,将无法显示玩家的影子.
     * - globalnoshadow 断言期间,所有玩家,helper,explod都不能显示影子.
     * - nomusic 断言期间,停止播放背景音乐.
     * - nowalk 断言期间,player不能进入行走状态,即使受控制.用于防止跑动状态取消为行走.
     * - timerfreeze 断言期间,阻止回合的倒计时.用于阻止回合的TimeOver(时间终了).
     * - unguardable 任何断言中玩家的Hitdef变得不可防御.即,他们的guardflag被忽略.
     */
    flag: SpecialFlag;
    /**
     * 可选断言标示
     * - intro 告诉MUGEN人物正在表演开场姿势.开场时(该标示)必须每帧都被断言.
     * - invisible 断言后人物变的不可见.不会影响显示的残影.
     * - roundnotover 告诉MUGEN人物正在表演胜利姿势.胜利时(此标示)每帧都该被断言.
     * - nobardisplay 当断言后,血条,能量条等等将不被显示.
     * - noBG 关闭背景,屏幕被清黑.
     * - noFG 无法显示舞台的1号图层.
     * - nostandguard 断言期间,人物将不能站立防御
     * - nocrouchguard 断言期间,人物将不能蹲下防御.
     * - noairguard 断言期间,人物将不能空中防御.
     * - noautoturn 断言期间,阻止人物自动转向对手.
     * - nojugglecheck 断言期间,juggle(连击数)将不会被检测.无论连击点数是多少,P2都能被连击.
     * - nokosnd 阻止已被击败的玩家播放11,0号声音(被KO的声音).对于拥有KO回声设定的玩家来说,为了压制住各种回声效果,nokosnd必须在玩家被KO之后断言大于等于50个帧数.
     * - nokoslow 断言期间,阻止MUGEN用慢动作显示一局的结束.
     * - noshadow 断言期间,将无法显示玩家的影子.
     * - globalnoshadow 断言期间,所有玩家,helper,explod都不能显示影子.
     * - nomusic 断言期间,停止播放背景音乐.
     * - nowalk 断言期间,player不能进入行走状态,即使受控制.用于防止跑动状态取消为行走.
     * - timerfreeze 断言期间,阻止回合的倒计时.用于阻止回合的TimeOver(时间终了).
     * - unguardable 任何断言中玩家的Hitdef变得不可防御.即,他们的guardflag被忽略.
     */
    flag2?: SpecialFlag;
    /**
     * 可选断言标示
     * - intro 告诉MUGEN人物正在表演开场姿势.开场时(该标示)必须每帧都被断言.
     * - invisible 断言后人物变的不可见.不会影响显示的残影.
     * - roundnotover 告诉MUGEN人物正在表演胜利姿势.胜利时(此标示)每帧都该被断言.
     * - nobardisplay 当断言后,血条,能量条等等将不被显示.
     * - noBG 关闭背景,屏幕被清黑.
     * - noFG 无法显示舞台的1号图层.
     * - nostandguard 断言期间,人物将不能站立防御
     * - nocrouchguard 断言期间,人物将不能蹲下防御.
     * - noairguard 断言期间,人物将不能空中防御.
     * - noautoturn 断言期间,阻止人物自动转向对手.
     * - nojugglecheck 断言期间,juggle(连击数)将不会被检测.无论连击点数是多少,P2都能被连击.
     * - nokosnd 阻止已被击败的玩家播放11,0号声音(被KO的声音).对于拥有KO回声设定的玩家来说,为了压制住各种回声效果,nokosnd必须在玩家被KO之后断言大于等于50个帧数.
     * - nokoslow 断言期间,阻止MUGEN用慢动作显示一局的结束.
     * - noshadow 断言期间,将无法显示玩家的影子.
     * - globalnoshadow 断言期间,所有玩家,helper,explod都不能显示影子.
     * - nomusic 断言期间,停止播放背景音乐.
     * - nowalk 断言期间,player不能进入行走状态,即使受控制.用于防止跑动状态取消为行走.
     * - timerfreeze 断言期间,阻止回合的倒计时.用于阻止回合的TimeOver(时间终了).
     * - unguardable 任何断言中玩家的Hitdef变得不可防御.即,他们的guardflag被忽略.
     */
    flag3?: SpecialFlag;
}

/**
 * AssertSpecial 
 * 
 * 此控制器此允许你同时断言3个特殊的标示.
 * 
 * 因为MUGEN会在每个游戏帧内自动撤销这些断言,所以如果想让他在一段时间内被激活,你必须在这段时间内每帧都断言.
 */
export default function AssertSpecial(params: AssertSpecialParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = AssertSpecial\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}