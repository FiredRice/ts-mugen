import { currentWrite } from '../core';
import { AttrValue, BaseSctrls, BaseValue } from '../types';
import { objectToString, transAttrValue, triggersToString, versionCheck } from '../utils';
import { isArray } from 'lodash';
import { BaseTrigger } from '../triggers/base';

interface VarParams extends BaseSctrls {
    value?: AttrValue;
}

interface RandomVarParams extends BaseSctrls {
    value?: AttrValue | [AttrValue, AttrValue];
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
     * VarSet - 设置玩家(起作用的)变量(var)数值
     * - value 整型变量的值
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
     * VarAdd - 增加玩家一个(起作用的)变量(var)数值.
     * - value 是加到当前索引号的整型变量上的值
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
     * VarRandom - 设定指定整型变量为随机数.
     * - value least_val 和 greatest_val 指定此控制器分别指定的最大和最小值.给变量指定的值是将在这个范围中随机选择的一个整数.范围默认是[0,1000].如果只指定一个参数,则被认为的指定范围是[0,参数].
     */
    public Random(params: RandomVarParams) {
        const { value = 0, triggers, describe = '', version, ...others } = params;
        versionCheck(() => {
            let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
            result += `type = VarRandom\n`;
            result += triggersToString(triggers);
            result += `v = ${transAttrValue(this.index)}\n`;
            result += `range = ${isArray(value) ? value.map(transAttrValue).join(', ') : transAttrValue(value)}\n`;
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
     * VarSet - 设置玩家(起作用的)变量(fvar)数值
     * - value 浮点型变量的值
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
     * VarAdd - 增加玩家一个(起作用的)变量(fvar)数值.
     * - value 是加到当前索引号的浮点型变量上的值
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
