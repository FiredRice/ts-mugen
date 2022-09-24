import { currentWrite } from '../core';
import { AttrValue, BaseSctrls, TransType } from '../types';
import { objectToString, triggersToString } from '../utils/index';

export interface AfterImageParams extends BaseSctrls {
    time?: AttrValue;
    length?: AttrValue;
    palcolor?: AttrValue;
    palinvertall?: AttrValue;
    palbright?: [AttrValue, AttrValue, AttrValue];
    palcontrast?: [AttrValue, AttrValue, AttrValue];
    palpostbright?: [AttrValue, AttrValue, AttrValue];
    paladd?: [AttrValue, AttrValue, AttrValue];
    palmul?: [AttrValue, AttrValue, AttrValue];
    timegap?: AttrValue;
    framegap?: AttrValue;
    trans?: TransType;
}

/**
 * AfterImage 
 * - 实现玩家的残影效果
 */
export default function AfterImage(params: AfterImageParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = AfterImage\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}