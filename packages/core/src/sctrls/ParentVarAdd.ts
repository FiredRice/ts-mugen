import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface ParentVarAddParams extends BaseSctrls {
    /***
     * var_no应该是0-59之中的一个整数.
     */
    v?: AttrValue;
    /**
     * var_no应该是0-39之中的一个整数.
     */
    fv?: AttrValue;
    /**
     * 加到索引号为var_no的整型/浮点型变量上的值.
     */
    value: AttrValue;
}

/**
 * ParentVarAdd 
 * 
 * 如果玩家是一个helper,增加玩家父级一个(起作用的)变量(var/fvar)数值.
 * 
 * 无论是整型变量还是浮点型变量都能被此控制器增加.
 * 
 * 如果此玩家不是helper,则此控制器无效.
 * 
 * ---
 * **注意：**
 * 
 * **如果你成功击中P2将他置于自定义状态,不要在自定义状态中给变量赋值.否则,你将覆盖P2父级的变量,这将引起对手未知错误.**
 * 
 * **(也就是说,不要在p2stateno,targetstate指定P2进入的状态里面使用varset,varrangeset,varadd,parentvaradd,parentvarset等等(除非你做整合或者你知道自己在做什么)**
 * 
 * **否则你设置的其实是P2或者他父级的var/fvar参数,所以将会引起未知错误.)**
 */
export default function ParentVarAdd(params: ParentVarAddParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = ParentVarAdd\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}