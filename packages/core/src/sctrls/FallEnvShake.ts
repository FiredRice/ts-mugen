import { currentWrite } from '../core';
import { BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface FallEnvShakeParams extends BaseSctrls {
}

/**
 * FallEnvShake 
 * - 使用攻击中设定的fall.envshake参数(详见HitDef控制器)使屏幕震动.
 */
export default function FallEnvShake(params: FallEnvShakeParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = FallEnvShake\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}
