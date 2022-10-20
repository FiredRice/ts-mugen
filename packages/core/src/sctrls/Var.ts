import { currentWrite } from '../core';
import { AttrValue, BaseSctrls, BaseValue } from '../types';
import { objectToString, transAttrValue, triggersToString, versionCheck } from '../utils';
import { isArray } from 'lodash';
import { BaseTrigger } from '../triggers/base';

export interface VarParams extends BaseSctrls {
    /**
     * 整数或浮点数
     */
    value?: AttrValue;
}

export interface RandomVarParams extends BaseSctrls {
    /**
     * least_val和greatest_val指定此控制器分别指定的最大和最小值.
     * 
     * 给变量指定的值是将在这个范围中随机选择的一个整数.
     * 
     * 范围默认是[0,1000].如果只指定一个参数,则被认为的指定范围是[0,参数].
     */
    range?: AttrValue | [AttrValue, AttrValue];
}

export interface VarRangeSetParams extends BaseSctrls {
    /**
     * 通过一次性计算指定给所有在此范围中的整型变量的值.
     */
    value?: AttrValue;
    /**
     * 通过一次性计算指定给所有在此范围中的浮点型型变量的值.
     */
    fvalue?: AttrValue;
    /**
     * 指定变量设置范围的下限值.默认是0(第一个变量).
     */
    first?: AttrValue;
    /**
     * 指定变量设置范围的上限值.
     * - 整型变量默认是59.
     * - 浮点型变量默认是39.(这是两种情况最大有效值)
     */
    last?: AttrValue;
}

/**
 * VarRangeSet
 * 
 * 将玩家一个连续范围内的(起作用的,工作中的)变量设置为相同值.
 * 
 * 无论是整型变量还是浮点型变量都能被此控制器设置,但不能同时设置.
 * 
 * ---
 * **注意：**
 * 
 * **如果你成功击中P2将他置于自定义状态,不要在自定义状态中给变量赋值.否则,你将覆盖P2的变量,这将引起对手未知错误.**
 * 
 * **(也就是说,不要在p2stateno,targetstate指定P2进入的状态里面使用varset,varrangeset,varadd,parentvaradd,parentvarset等等(除非你做整合或者你知道自己在做什么)**
 * 
 * **否则你设置的其实是P2或者他父级的var/fvar参数,所以将会引起未知错误.)**
 */
export function VarRangeSet(params: VarRangeSetParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = VarRangeSet\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}

/**
 * 整型变量
 * - 若设置 describe，则该类实例化的变量【会】附加输出到变量表中
 */
export class Var extends BaseTrigger {
    protected index: AttrValue;

    /**
     * 声名变量
     * @param index 变量索引
     */
    constructor(index: AttrValue, describe: string = '') {
        super(`var(${transAttrValue(index)})`);
        this.index = index;
        !!describe && currentWrite.addVar(transAttrValue(index), describe);
    }

    /**
     * 获取变量索引
     */
    public getIndex() {
        return this.index;
    }

    /**
     * VarSet
     * 
     * 设置玩家(起作用的)变量(var/fvar)数值.
     * 
     * 无论是整型变量还是浮点型变量都能被此控制器设置,但不能同时设置.
     * 
     * ---
     * **注意：**
     * 
     * **如果你成功击中P2将他置于自定义状态,不要在自定义状态中给变量赋值.否则,你将覆盖P2的变量,这将引起对手未知错误.**
     * 
     * **(也就是说,不要在p2stateno,targetstate指定P2进入的状态里面使用varset,varrangeset,varadd,parentvaradd,parentvarset等等(除非你做整合或者你知道自己在做什么)**
     * 
     * **否则你设置的其实是P2或者他父级的var/fvar参数,所以将会引起未知错误.**
     * 
     * **这种情况的特例:最典型的就是中毒效果,不断少血.还有就是老版本AI人物(一般AI开关都是var(59)),你可以在自定义状态中设置对手的var(59)=-1000直接关掉对手的AI.- -)**
     */
    public Set(params: VarParams) {
        const { value = 0, triggers, describe = '', version, ...others } = params;
        versionCheck(() => {
            let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
            result += `type = VarSet\n`;
            result += triggersToString(triggers);
            result += `v = ${transAttrValue(this.index)}\n`;
            result += `value = ${transAttrValue(value)}\n`;
            result += objectToString(others);
            currentWrite.append(result);
        }, version);
    }

    /**
     * VarAdd
     * 
     * 增加玩家一个(起作用的)变量(var)数值.
     * 
     * 无论是整型变量还是浮点型变量都能被此控制器增加.
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
    public Add(params: VarParams) {
        const { value = 0, triggers, describe = '', version, ...others } = params;
        versionCheck(() => {
            let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
            result += `type = VarAdd\n`;
            result += triggersToString(triggers);
            result += `v = ${transAttrValue(this.index)}\n`;
            result += `value = ${transAttrValue(value)}\n`;
            result += objectToString(others);
            currentWrite.append(result);
        }, version);
    }

    /**
     * VarRandom
     * 
     * 设定指定整型变量为随机数.浮点型变量不能用此控制器设置.
     * 
     * ---
     * 示例:
     * ```
     * ; 指定一个0-500之间的随机数给var(5).
     * type = VarRandom
     * v = 5
     * range = 500
     * ```
     * ---
     * **注意：**
     * 
     * **如果你成功击中P2将他置于自定义状态,不要在自定义状态中给变量赋值.否则,你将覆盖P2的变量,这将引起对手未知错误.**
     * 
     * **(也就是说,不要在p2stateno,targetstate指定P2进入的状态里面使用varset,varrangeset,varadd,parentvaradd,parentvarset等等(除非你做整合或者你知道自己在做什么)**
     * 
     * **否则你设置的其实是P2或者他父级的var/fvar参数,所以将会引起未知错误.)**
     */
    public Random(params: RandomVarParams) {
        const { range = 0, triggers, describe = '', version, ...others } = params;
        versionCheck(() => {
            let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
            result += `type = VarRandom\n`;
            result += triggersToString(triggers);
            result += `v = ${transAttrValue(this.index)}\n`;
            result += `range = ${isArray(range) ? range.map(transAttrValue).join(', ') : transAttrValue(range)}\n`;
            result += objectToString(others);
            currentWrite.append(result);
        }, version);
    }
}

/**
 * Helper 中使用的整型变量
 */
export class HelperVar extends Var {
    /**
     * 
     * @param id
     * @param index 变量索引
     */
    public constructor(id: AttrValue, index: AttrValue) {
        super(index);
        this._setInnerName(`helper(${transAttrValue(id)}), var(${index})`);
    }
}


/**
 * 浮点型变量
 * - 若设置 describe，则该类实例化的变量【会】附加输出到变量表中
 */
export class FVar extends BaseTrigger {
    private index: AttrValue;

    public constructor(index: AttrValue, describe: string = '') {
        super(`fvar(${transAttrValue(index)})`);
        this.index = index;
        !!describe && currentWrite.addFVar(transAttrValue(index), describe);
    }

    /**
     * 获取变量索引
     */
    public getIndex() {
        return this.index;
    }

    /**
     * VarSet
     * 
     * 设置玩家(起作用的)变量(var/fvar)数值.
     * 
     * 无论是整型变量还是浮点型变量都能被此控制器设置,但不能同时设置.
     * 
     * ---
     * **注意：**
     * 
     * **如果你成功击中P2将他置于自定义状态,不要在自定义状态中给变量赋值.否则,你将覆盖P2的变量,这将引起对手未知错误.**
     * 
     * **(也就是说,不要在p2stateno,targetstate指定P2进入的状态里面使用varset,varrangeset,varadd,parentvaradd,parentvarset等等(除非你做整合或者你知道自己在做什么)**
     * 
     * **否则你设置的其实是P2或者他父级的var/fvar参数,所以将会引起未知错误.**
     * 
     * **这种情况的特例:最典型的就是中毒效果,不断少血.还有就是老版本AI人物(一般AI开关都是var(59)),你可以在自定义状态中设置对手的var(59)=-1000直接关掉对手的AI.- -)**
     */
    public Set(params: VarParams) {
        const { value = 0, triggers, describe = '', version, ...others } = params;
        versionCheck(() => {
            let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
            result += `type = VarSet\n`;
            result += triggersToString(triggers);
            result += `fv = ${transAttrValue(this.index)}\n`;
            result += `value = ${transAttrValue(value)}\n`;
            result += objectToString(others);
            currentWrite.append(result);
        }, version);
    }

    /**
     * VarAdd
     * 
     * 增加玩家一个(起作用的)变量(var)数值.
     * 
     * 无论是整型变量还是浮点型变量都能被此控制器增加.
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
    public Add(params: VarParams) {
        const { value = 0, triggers, describe = '', version, ...others } = params;
        versionCheck(() => {
            let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
            result += `type = VarAdd\n`;
            result += triggersToString(triggers);
            result += `fv = ${transAttrValue(this.index)}\n`;
            result += `value = ${transAttrValue(value)}\n`;
            result += objectToString(others);
            currentWrite.append(result);
        }, version);
    }
}



/**
 * Helper 中使用的浮点型变量
 */
export class HelperFVar extends FVar {
    /**
     * 
     * @param id
     * @param index 变量索引
     */
    public constructor(id: AttrValue, index: AttrValue) {
        super(index);
        this._setInnerName(`helper(${transAttrValue(id)}), fvar(${index})`);
    }
}
