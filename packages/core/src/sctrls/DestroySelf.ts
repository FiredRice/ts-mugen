import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface DestroySelfParams extends BaseSctrls {
    recursive?: AttrValue;
    removeexplods?: AttrValue;
}

/**
 * DestroySelf 
 * - 如果(此控制器)被helper类型人物调用,DestroySelf将导致此人物从游戏画面中被移除.
 */
export default function DestroySelf(params: DestroySelfParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = DestroySelf\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}