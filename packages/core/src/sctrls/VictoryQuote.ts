import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface VictoryQuoteParams extends BaseSctrls {
    value?: AttrValue;
}

/**
 * VictoryQuote 
 * - 从玩家中选择一个胜利引语显示在胜利画面中.
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