import { BaseValue, TriggerValue } from '../types';
import { transTriggerValue } from '../utils';

/**
 * 操作权重
 */
enum OperationWeight {
    none = 0,
    add = 10,
    sub = 11,
    multiply = 20,
    division = 21,
    remainder = 22,
    pow = 23,
    and = 30,
    or = 31,
    xor = 32,
    byteReversed = 40,
    byteAnd = 41,
    byteOr = 42,
    byteXor = 43,
    equal = 50,
    notEqual = 51,
    not = 60,
    less = 70,
    lessEqual = 71,
    over = 80,
    overEqual = 81,
    between = 90,
    setValue = 100,
}

export class BaseTrigger {
    protected _innerName: BaseValue = '';
    private prevOpration: OperationWeight = OperationWeight.none;

    public constructor(name: BaseValue) {
        this._innerName = name;
    }

    private perfix() {
        if ([OperationWeight.equal, OperationWeight.notEqual].includes(this.prevOpration)) {
            return ',';
        }
        return '';
    }

    public _setInnerName(name: BaseValue) {
        this._innerName = name;
    }

    /**
     * 编译时的实际值
     */
    public get value() {
        return this._innerName;
    }

    /**
     * 加
     */
    public add(target: TriggerValue) {
        this._innerName += ` + ${transTriggerValue(target)}`;
        this.prevOpration = OperationWeight.add;
        return this;
    }

    /**
     * 减
     */
    public sub(target: TriggerValue) {
        this._innerName += ` - ${transTriggerValue(target)}`;
        this.prevOpration = OperationWeight.sub;
        return this;
    }

    /**
     * 乘
     */
    public multiply(target: TriggerValue) {
        this._innerName += ` * ${transTriggerValue(target)}`;
        this.prevOpration = OperationWeight.multiply;
        return this;
    }

    /**
     * 除
     */
    public division(target: TriggerValue) {
        this._innerName += ` / ${transTriggerValue(target)}`;
        this.prevOpration = OperationWeight.division;
        return this;
    }

    /**
     * 取余
     */
    public remainder(target: TriggerValue) {
        this._innerName += ` % ${transTriggerValue(target)}`;
        this.prevOpration = OperationWeight.remainder;
        return this;
    }

    /**
     * 幂运算
     */
    public pow(target: TriggerValue) {
        this._innerName += ` ** ${transTriggerValue(target)}`;
        this.prevOpration = OperationWeight.pow;
        return this;
    }

    /**
     * 逻辑与运算
     */
    public and(target: TriggerValue) {
        this._innerName += ` && ${transTriggerValue(target)}`;
        this.prevOpration = OperationWeight.and;
        return this;
    }

    /**
     * 逻辑或运算
     */
    public or(target: TriggerValue) {
        this._innerName += ` || ${transTriggerValue(target)}`;
        this.prevOpration = OperationWeight.or;
        return this;
    }

    /**
     * 逻辑异或运算
     */
    public xor(target: TriggerValue) {
        this._innerName += ` ^^ ${transTriggerValue(target)}`;
        this.prevOpration = OperationWeight.xor;
        return this;
    }

    /**
     * 按位取反运算符
     */
    public byteReversed(target: TriggerValue) {
        this._innerName += ` ~ ${transTriggerValue(target)}`;
        this.prevOpration = OperationWeight.byteReversed;
        return this;
    }

    /**
     * 按位与运算符
     */
    public byteAnd(target: TriggerValue) {
        this._innerName += ` & ${transTriggerValue(target)}`;
        this.prevOpration = OperationWeight.byteAnd;
        return this;
    }

    /**
     * 按位或运算符
     */
    public byteOr(target: TriggerValue) {
        this._innerName += ` | ${transTriggerValue(target)}`;
        this.prevOpration = OperationWeight.byteOr;
        return this;
    }

    /**
     * 按位异或运算符
     */
    public byteXor(target: TriggerValue) {
        this._innerName += ` ^ ${transTriggerValue(target)}`;
        this.prevOpration = OperationWeight.byteXor;
        return this;
    }

    /**
     * 等于
     */
    public equal(target: TriggerValue) {
        this._innerName += ` = ${transTriggerValue(target)}`;
        this.prevOpration = OperationWeight.equal;
        return this;
    }

    /**
     * 不等于
     */
    public notEqual(target: TriggerValue) {
        this._innerName += ` != ${transTriggerValue(target)}`;
        this.prevOpration = OperationWeight.notEqual;
        return this._innerName;
    }

    /**
     * 非
     */
    public not() {
        this._innerName = `!${this._innerName}`;
        this.prevOpration = OperationWeight.not;
        return this;
    }

    /**
     * 小于
     */
    public less(target: TriggerValue) {
        this._innerName += `${this.perfix()} < ${transTriggerValue(target)}`;
        this.prevOpration = OperationWeight.less;
        return this._innerName;
    }

    /**
     * 大于
     */
    public over(target: TriggerValue) {
        this._innerName += `${this.perfix()} > ${transTriggerValue(target)}`;
        this.prevOpration = OperationWeight.over;
        return this._innerName;
    }

    /**
     * 大于等于
     */
    public overEqual(target: TriggerValue) {
        this._innerName += `${this.perfix()} >= ${transTriggerValue(target)}`;
        this.prevOpration = OperationWeight.overEqual;
        return this._innerName;
    }

    /**
     * 小于等于
     */
    public lessEqual(target: TriggerValue) {
        this._innerName += `${this.perfix()} <= ${transTriggerValue(target)}`;
        this.prevOpration = OperationWeight.lessEqual;
        return this._innerName;
    }

    /**
     * 介于
     */
    public between(start: TriggerValue, end: TriggerValue) {
        this._innerName += `${this.perfix()} = [${transTriggerValue(start)}, ${transTriggerValue(end)}]`;
        this.prevOpration = OperationWeight.between;
        return this._innerName;
    }

    /**
     * 赋值
     */
    public setValue(value: BaseValue) {
        this.prevOpration = OperationWeight.setValue;
        return `${this._innerName} := ${value}`;
    }
}

export class BasePerfix {

    protected perfix: string;

    public constructor(perfix: string = '') {
        this.perfix = perfix;
    }

    protected getPerfix() {
        if (!!this.perfix) {
            return `${this.perfix}, `;
        }
        return '';
    }

    protected setPerfix(perfix: string = '') {
        this.perfix = perfix;
    }
}

export function createBaseFunTrigger(name: string) {
    return function (id?: BaseValue) {
        if (id == null) {
            return new BaseTrigger(name);
        }
        return new BaseTrigger(`${name}(${id})`);
    };
}