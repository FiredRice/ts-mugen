import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface DestroySelfParams extends BaseSctrls {
    /**
     * 若值为1,此helper派生出的所有helper将同时被销毁.
     * - 默认为0.
     */
    recursive?: AttrValue;
    /**
     * - 若值为1,所有属于此helper的explod也将被移除.
     * - 若recursive值为1,派生出的所有helper的explod也将被移除.
     * - 默认为0
     */
    removeexplods?: AttrValue;
}

/**
 * DestroySelf 
 * 
 * 如果(此控制器)被helper类型人物调用,DestroySelf将导致此人物从游戏画面中被移除.
 * 
 * DestroySelf对非helper人物无效.
 * 
 * ---
 * **注意：**
 * 
 * **任何束缚于此helper的玩家或explod,在DestroySelf执行时将强制解除束缚.**
 * 
 * **任何此helper没有被移除的explod都会被孤立.**
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