import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface TargetLifeAddParams extends BaseSctrls {
    /**
     * 增加到每个目标生命值的数量
     */
    value: AttrValue;
    /**
     * 指定要作用的目标ID号.只有此ID号的目标将被影响.
     * - 默认为-1.(对所有目标起作用)
     */
    ID?: AttrValue;
    /**
     * 如果kill_flag是0,则不会杀死目标,最少保留目标1点血.
     * - 默认是1.
     */
    kill?: AttrValue;
    /**
     * 如果abs_flag是1,则add_amt将不受缩放影响(比如攻击,防御系数将被忽略).
     * - 默认为0.
     */
    absolute?: AttrValue;
}

/**
 * TargetLifeAdd 
 * 
 * 增加目标生命值指定的数量,必要的话此数量会被目标的防御系数缩放.
 */
export default function TargetLifeAdd(params: TargetLifeAddParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = TargetLifeAdd\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}