import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface VictoryQuoteParams extends BaseSctrls {
    /**
     * 指定要使用引语的索引.有效值从0到99.如果quote_index为无效的索引,则一个随机的引语将被选择.
     * - 默认是-1.
     */
    value?: AttrValue;
}

/**
 * VictoryQuote 
 * 
 * 从玩家中选择一个胜利引语显示在胜利画面中.
 * 
 * ---
 * **注意：**
 * 
 * **此控制器在比赛中能被任何玩家在任何时间调用.然而,只有获胜的玩家将影响被显示的引语.**
 * 
 * **此控制器仅影响当前比赛后出现的短暂的胜利画面.helper使用此控制器将无效.**
 * 
 * **实际的胜利引语是在玩家的cns文件[Quotes]组中指定的.**
 */
export default function VictoryQuote(params: VictoryQuoteParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = VictoryQuote\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}