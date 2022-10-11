import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface ChangeStateParams extends BaseSctrls {
    value: AttrValue;
    ctrl?: AttrValue;
    anim?: AttrValue;
}

/**
 * ChangeState 
 * - 改变玩家的状态号.
 */
export function ChangeState(params: ChangeStateParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = ChangeState\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}

/**
 * SelfState 
 * - 同ChangeState,只是SelfState使玩家返回他自己状态数据中的状态.
 * - 用于下列情况: 当通过一次攻击你已置对手于一个自定义状态,且希望恢复对手到他自己的状态
 */
export function SelfState(params: ChangeStateParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = SelfState\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}