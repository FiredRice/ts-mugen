import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface ChangeStateParams extends BaseSctrls {
    /**
     * 改变为的状态号
     */
    value: AttrValue;
    /**
     * 设置玩家是否受控制.
     * - 0表示不受控制
     * - 非0表示受控制.
     */
    ctrl?: AttrValue;
    /**
     * 切换的动作号.如果省略,玩家的动画将不变.
     */
    anim?: AttrValue;
}

/**
 * ChangeState 
 * 
 * 改变玩家的状态号.
 * 
 * ---
 * 示例：
 * ```
 * ; 转换为站立姿势,且使玩家受控制.
 * type = ChangeState
 * value = 0
 * ctrl = 1
 * ```
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
 * 
 * 同ChangeState,只是SelfState使玩家返回他自己状态数据中的状态.
 * 
 * 用于下列情况: 
 * - 当通过一次攻击你已置对手于一个自定义状态,且希望恢复对手到他自己的状态
 * 
 * ---
 * 注：此控制器可替换ChangeState,但ChangeState不可替换此控制器.
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