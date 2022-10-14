import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils/index';

interface AngleAddParams extends BaseSctrls {
    /**
     * 必须以角度形式给出
     */
    value: AttrValue;
}

/**
 * AngleAdd 
 * 
 * 用于AngleDraw控制器,增加绘制的角度.
 */
export default function AngleAdd(params: AngleAddParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = AngleAdd\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}