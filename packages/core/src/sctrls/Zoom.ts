import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface ZoomParams extends BaseSctrls {
    /**
     * 缩放大小（必须大于 1）
     */
    scale?: [AttrValue, AttrValue];
    /**
     * 缩放位置（离屏幕正中央的距离）
     */
    pos?: [AttrValue, AttrValue];
    /**
     * 缩放速率/延迟
     */
    lag?: AttrValue;
    facing?: AttrValue;
}

/**
 * Zoom 
 */
export default function Zoom(params: ZoomParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = Zoom\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}