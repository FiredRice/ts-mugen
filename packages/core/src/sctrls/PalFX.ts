import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface PalFXParams extends BaseSctrls {
    time?: AttrValue;
    add?: [AttrValue, AttrValue, AttrValue];
    mul?: [AttrValue, AttrValue, AttrValue];
    sinadd?: [AttrValue, AttrValue, AttrValue] | [AttrValue, AttrValue, AttrValue, AttrValue];
    invertall?: AttrValue;
    color?: AttrValue;
}

/**
 * PalFX 
 * - 提供色表的临时效果.这些效果将会同时影响此玩家拥有的explod和helper的色表,除非它们已指定ownpal为非零.
 */
export function PalFX(params: PalFXParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = PalFX\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}

/**
 * AllPalFX 
 * - 与PalFX相似,只是AllPalFX影响背景和血条以及所有人物和爆炸火花的色表.(无论ownpal参数如何设定)
 */
export function AllPalFX(params: PalFXParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = AllPalFX\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}

/**
 * BGPalFX 
 * - 与PalFX相同,只是BGPalFX影响背景和血条的色表而不是人物的色表.
 */
export function BGPalFX(params: PalFXParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = BGPalFX\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}