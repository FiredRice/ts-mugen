import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils/index';

export interface BindToTargetParams extends BaseSctrls {
    /**
     * 指定绑定的有效时间帧数.
     * - 默认为1.
     */
    time?: AttrValue;
    /**
     * 指定要绑定的目标ID号.
     * - 默认为-1(选择任何目标).
     */
    ID?: AttrValue;
    /**
     * pos_x和pos_y指定绑定的偏移量(距离绑定点).
     * 
     * - 默认为0,0.
     * 
     * 绑定点默认为目标的坐标轴心.
     * - 如果"postype"是"Foot",则绑定点是目标的坐标轴心.
     * - 如果"postype"是"Mid",则绑定点是目标的中段.
     * - 如果"postype"是"Head",则绑定点是目标的头部.
     * 
     * 对于后2种情况,绑定点由目标人物CNS文件中head.pos和mid.pos参数值决定.
     * 
     * 绑定点不保证正好与目标头部或者中段位置相匹配.
     */
    pos?: [AttrValue, AttrValue];
}

/**
 * BindToTarget 
 * 
 * 把玩家绑定到相对于指定目标的指定位置.
 * 
 * ---
 * 注：TargetBind是把目标绑定到你身上,BindToTarget是把你绑定到目标身上.
 */
export default function BindToTarget(params: BindToTargetParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = BindToTarget\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}