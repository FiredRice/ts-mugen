import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, transAttrValue, triggersToString } from '../utils';
import { isArray } from 'lodash';
import { BaseTrigger } from '../triggers/base';

interface VarParams extends BaseSctrls {
    value?: AttrValue;
}

interface RandomVarParams extends BaseSctrls {
    value?: AttrValue | [AttrValue, AttrValue];
}

/**
 * 非本体整型变量
 * - 该类实例化的变量【不会】附加输出到变量表中
 */
export class NormalVar extends BaseTrigger {
    protected index: AttrValue;

    /**
     * 声名变量
     * @param index 变量索引
     */
    constructor(index: AttrValue) {
        super(`var(${transAttrValue(index)})`);
        this.index = index;
    }

    /**
     * 清除缓存
     * - 建议每次对变量进行计算后调用
     */
    protected reset() {
        this._setInnerName(`var(${transAttrValue(this.index)})`);
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
        const { value = 0, triggers, describe = '', ...others } = params;
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = VarSet\n`;
        result += triggersToString(triggers);
        result += `v = ${transAttrValue(this.index)}\n`;
        result += `value = ${transAttrValue(value)}\n`;
        result += objectToString(others);
        currentWrite.append(result);
    }

    /**
     * VarAdd - 增加玩家一个(起作用的)变量(var)数值.
     * - value 是加到当前索引号的整型变量上的值
     */
    public Add(params: VarParams) {
        const { value = 0, triggers, describe = '', ...others } = params;
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = VarAdd\n`;
        result += triggersToString(triggers);
        result += `v = ${transAttrValue(this.index)}\n`;
        result += `value = ${transAttrValue(value)}\n`;
        result += objectToString(others);
        currentWrite.append(result);
    }

    /**
     * VarRandom - 设定指定整型变量为随机数.
     * - value least_val 和 greatest_val 指定此控制器分别指定的最大和最小值.给变量指定的值是将在这个范围中随机选择的一个整数.范围默认是[0,1000].如果只指定一个参数,则被认为的指定范围是[0,参数].
     */
    public Random(params: RandomVarParams) {
        const { value = 0, triggers, describe = '', ...others } = params;
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = VarRandom\n`;
        result += triggersToString(triggers);
        result += `v = ${transAttrValue(this.index)}\n`;
        result += `range = ${isArray(value) ? value.map(transAttrValue).join(', ') : transAttrValue(value)}\n`;
        result += objectToString(others);
        currentWrite.append(result);
    }
}

/**
 * 本体整型变量
 * - 该类实例化的变量【会】附加输出到变量表中
 */
export class Var extends NormalVar {
    /**
     * 实例化变量
     * @param index 索引
     * @param describe 描述
     */
    constructor(index: AttrValue, describe: string = '') {
        super(index);
        currentWrite.addVar(transAttrValue(index), describe);
    }
}

/**
 * 非本体浮点型变量
 * - 该类实例化的变量【不会】附加输出到变量表中
 */
export class NormalFVar extends BaseTrigger {
    private index: AttrValue;

    public constructor(index: AttrValue) {
        super(`fvar(${transAttrValue(index)})`);
        this.index = index;
    }

    /**
     * 清除缓存
     * - 建议每次对变量进行计算后调用
     */
    protected reset() {
        this._setInnerName(`fvar(${transAttrValue(this.index)})`);
    }

    /**
     * VarSet - 设置玩家(起作用的)变量(fvar)数值
     * - value 浮点型变量的值
     */
    public Set(params: VarParams) {
        const { value = 0, triggers, describe = '', ...others } = params;
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = VarSet\n`;
        result += triggersToString(triggers);
        result += `fv = ${transAttrValue(this.index)}\n`;
        result += `value = ${transAttrValue(value)}\n`;
        result += objectToString(others);
        currentWrite.append(result);
    }


    /**
     * VarAdd - 增加玩家一个(起作用的)变量(fvar)数值.
     * - value 是加到当前索引号的浮点型变量上的值
     */
    public Add(params: VarParams) {
        const { value = 0, triggers, describe = '', ...others } = params;
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = VarAdd\n`;
        result += triggersToString(triggers);
        result += `fv = ${transAttrValue(this.index)}\n`;
        result += `value = ${transAttrValue(value)}\n`;
        result += objectToString(others);
        currentWrite.append(result);
    }
}

/**
 * 本体浮点型变量
 * - 该类实例化的变量【会】附加输出到变量表中
 */
export class FVar extends NormalFVar {
    /**
     * 声名变量
     * @param index 变量索引
     * @param describe 描述
     */
    public constructor(index: AttrValue, describe: string = '') {
        super(index);
        currentWrite.addFVar(transAttrValue(index), describe);
    }
}
