import { currentWrite } from '../core';
import { BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface FallEnvShakeParams extends BaseSctrls {
}

/**
 * FallEnvShake 
 * 
 * 使用攻击中设定的fall.envshake参数(详见HitDef控制器)使屏幕震动.
 * 
 * 此控制器仅当GetHitVar(fall.envshake.time)不为0的时候才有效,且被执行后将GetHitVar(fall.envshake.time)设置为0.
 * 
 * 此控制器被用于common1.cns中当一个玩家落地时使屏幕震动,其他没什么用.
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
