import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface EnvShakeParams extends BaseSctrls {
    /**
     * 指定屏幕将要震动的时间帧数.
     */
    time: AttrValue;
    /**
     * freq 是一个0(缓慢的)到180(快速的)的浮点数.
     * - 默认为60.
     */
    freq?: AttrValue;
    /**
     * 振幅越大,屏幕上下震动的越远.
     * 
     * 振幅为负数意味着屏幕将首先向下震动.
     * - 默认值是-4(在240p设定下),-8(在480p设定下),-16(在720p设定下).
     */
    ampl?: AttrValue;
    /**
     * 指定震动的相位偏移
     * - 默认为0.
     * - 频率乘数大于等于90时,默认相位偏移是90.
     */
    phase?: AttrValue;
}

/**
 * EnvShake 
 * 
 * 引起屏幕垂直的震动.
 */
export default function EnvShake(params: EnvShakeParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = EnvShake\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}