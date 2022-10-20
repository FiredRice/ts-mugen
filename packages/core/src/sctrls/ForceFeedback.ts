import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface ForceFeedbackParams extends BaseSctrls {
    /**
     * 有效的waveform(波形)是"sine(正弦波)","square(方波)","sinesquare(正弦方波？)",和"off".
     * 
     * 对双震动控制器(手柄)来说,一个正弦波对应着马达发出大型隆隆声,一个方波对应着马达发出小的蜂鸣声.
     * 
     * 当然,正弦方波同时对应着2个马达.使用"off"来关闭目前存在的任何力反馈.waveform默认是sine.
     */
    waveform?: 'sine' | 'square' | 'sinesquare' | 'off';
    /**
     * 指定力反馈将持续多少时间,用帧数表示.
     * - 默认为60.
     */
    time?: AttrValue;
    /**
     * 力反馈的频率在0-255之间变化.
     * 
     * 决定力反馈频率的公式是:start + d1 * t + d2 * t ** 2 + d3 * t ** 3
     * 
     * 这里的t代表从力反馈被启动时逝去的时间帧数.
     * 
     * 目前来说,频率参数被完全忽略.
     * - 默认 freq = 128,0,0,0.
     */
    freq?: [AttrValue, AttrValue, AttrValue, AttrValue];
    /**
     * 力反馈的振幅在0-255之间变化.
     * 
     * 决定力反馈频率的公式是:start + d1 * t + d2 * t ** 2 + d3 * t ** 3
     * 
     * 这里的t代表从力反馈被启动时逝去的时间帧数.
     * - 默认 ampl = 128,0,0,0.
     */
    ampl?: [AttrValue, AttrValue, AttrValue, AttrValue];
    /**
     * 如果self是1,则P1的pad(应该指的是joypad游戏手柄)将震动.
     * 
     * 如果是0,则P2的手柄将震动.
     * - 默认是1.
     */
    self?: AttrValue;
}

/**
 * ForceFeedback 
 * 
 * 为支持的力反馈装置创建力反馈.
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