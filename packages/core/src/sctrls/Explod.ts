import { currentWrite } from '../core';
import { AttrValue, BasePostype, BaseSctrls, TransType } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface ExplodParams extends BaseSctrls {
    anim: AttrValue;
    ID?: AttrValue;
    space?: 'screen' | 'stage';
    postype?: BasePostype | 'none';
    pos?: [AttrValue, AttrValue];
    facing?: AttrValue;
    vfacing?: AttrValue;
    bindID?: AttrValue;
    bindtime?: AttrValue;
    vel?: [AttrValue, AttrValue];
    accel?: [AttrValue, AttrValue];
    removetime?: AttrValue;
    scale?: [AttrValue, AttrValue];
    sprpriority?: AttrValue;
    angle?: AttrValue;
    yangle?: AttrValue;
    xangle?: AttrValue;
    ontop?: AttrValue;
    shadow?: AttrValue;
    ownpal?: AttrValue;
    remappal?: [AttrValue, AttrValue];
    removeongethit?: AttrValue;
    trans?: TransType;
    alpha?: AttrValue;
    random?: [AttrValue, AttrValue];
    supermove?: AttrValue;
    supermovetime?: AttrValue;
    pausemovetime?: AttrValue;
}

/**
 * Explod 
 * - 显示诸如火花,尘土以及其他视觉效果动画的灵活工具.
 */
export function Explod(params: ExplodParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = Explod\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}

/**
 * ModifyExplod 
 * - 修改现有的Explod的参数.基本语法和Explod相同.然而,此控制器以后可能改动.
 * - 依赖于此控制器的任何代码在以后不保证可以正常工作.
 * - 对某些explod的参数貌似无效.
 */
export function ModifyExplod(params: ExplodParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = ModifyExplod\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}