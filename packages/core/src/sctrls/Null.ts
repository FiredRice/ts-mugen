import { currentWrite } from '../core';
import { BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface NullParams extends BaseSctrls {
}

/**
 * Null 
 * 什么也不做.也许用来使其他状态控制器暂时失效,只要简单的吧type改成Null.
 * 
 * (实际中也主要用于调试或者修改的,比如要使一个很多行的控制器失效只要type=null就行了)
 * 
 * ---
 * 注:
 * 
 * 此控制器用法相当灵活.
 * 
 * 由于null虽然什么也不做,但他也是一个标准的控制器.
 * 
 * 故null中设置的trigger也像其他控制器一样会被执行,同样遵守trigger执行顺序.
 */
export default function Null(params: NullParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = Null\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}