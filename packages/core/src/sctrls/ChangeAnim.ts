import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils/index';

interface ChangeAnimParams extends BaseSctrls {
    value: AttrValue;
    elem?: AttrValue;
}

/**
 * ChangeAnim 
 * - 改变玩家动作号
 */
export function ChangeAnim(params: ChangeAnimParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = ChangeAnim\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}

/**
 * ChangeAnim2 
 * - 和ChangeAnim一样,只是此控制器应用在如下的情况中:
 * - 如果你已置P2于一个自定义状态且希望把P2的动作改为P1指定air文件中的动作.
 */
export function ChangeAnim2(params: ChangeAnimParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = ChangeAnim2\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}