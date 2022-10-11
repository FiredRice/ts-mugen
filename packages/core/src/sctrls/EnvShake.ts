import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface EnvShakeParams extends BaseSctrls {
    time: AttrValue;
    freq?: AttrValue;
    ampl?: AttrValue;
    phase?: AttrValue;
}

/**
 * EnvShake 
 * - 引起屏幕垂直的震动.
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