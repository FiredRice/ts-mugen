import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface ForceFeedbackParams extends BaseSctrls {
    waveform?: AttrValue;
    time?: AttrValue;
    freq?: [AttrValue, AttrValue, AttrValue, AttrValue];
    ampl?: [AttrValue, AttrValue, AttrValue, AttrValue];
    self?: AttrValue;
}

/**
 * ForceFeedback 
 * - 为支持的力反馈装置创建力反馈.
 * - 此控制器在MUGEN1.0中未能实现.
 * - ForceFeedback控制器中的参数也许不能用算术表达式来指定.
 */
export default function ForceFeedback(params: ForceFeedbackParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = ForceFeedback\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}