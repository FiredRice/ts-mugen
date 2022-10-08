import { BaseValue, AttrValue } from '../types';
import { transAttrValue } from '../utils';

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
    notBetween = 91,
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
    public add(target: AttrValue) {
        this._innerName += ` + ${transAttrValue(target)}`;
        this.prevOpration = OperationWeight.add;
        return this;
    }

    /**
     * 减
     */
    public sub(target: AttrValue) {
        this._innerName += ` - ${transAttrValue(target)}`;
        this.prevOpration = OperationWeight.sub;
        return this;
    }

    /**
     * 乘
     */
    public multiply(target: AttrValue) {
        this._innerName += ` * ${transAttrValue(target)}`;
        this.prevOpration = OperationWeight.multiply;
        return this;
    }

    /**
     * 除
     */
    public division(target: AttrValue) {
        this._innerName += ` / ${transAttrValue(target)}`;
        this.prevOpration = OperationWeight.division;
        return this;
    }

    /**
     * 取余
     */
    public remainder(target: AttrValue) {
        this._innerName += ` % ${transAttrValue(target)}`;
        this.prevOpration = OperationWeight.remainder;
        return this;
    }

    /**
     * 幂运算
     */
    public pow(target: AttrValue) {
        this._innerName += ` ** ${transAttrValue(target)}`;
        this.prevOpration = OperationWeight.pow;
        return this;
    }

    /**
     * 逻辑与运算
     */
    public and(target: AttrValue) {
        this._innerName += ` && ${transAttrValue(target)}`;
        this.prevOpration = OperationWeight.and;
        return this;
    }

    /**
     * 逻辑或运算
     */
    public or(target: AttrValue) {
        this._innerName += ` || ${transAttrValue(target)}`;
        this.prevOpration = OperationWeight.or;
        return this;
    }

    /**
     * 逻辑异或运算
     */
    public xor(target: AttrValue) {
        this._innerName += ` ^^ ${transAttrValue(target)}`;
        this.prevOpration = OperationWeight.xor;
        return this;
    }

    /**
     * 按位取反运算符
     */
    public byteReversed(target: AttrValue) {
        this._innerName += ` ~ ${transAttrValue(target)}`;
        this.prevOpration = OperationWeight.byteReversed;
        return this;
    }

    /**
     * 按位与运算符
     */
    public byteAnd(target: AttrValue) {
        this._innerName += ` & ${transAttrValue(target)}`;
        this.prevOpration = OperationWeight.byteAnd;
        return this;
    }

    /**
     * 按位或运算符
     */
    public byteOr(target: AttrValue) {
        this._innerName += ` | ${transAttrValue(target)}`;
        this.prevOpration = OperationWeight.byteOr;
        return this;
    }

    /**
     * 按位异或运算符
     */
    public byteXor(target: AttrValue) {
        this._innerName += ` ^ ${transAttrValue(target)}`;
        this.prevOpration = OperationWeight.byteXor;
        return this;
    }

    /**
     * 等于
     */
    public equal(target: AttrValue) {
        this._innerName += `${this.perfix()} = ${transAttrValue(target)}`;
        this.prevOpration = OperationWeight.equal;
        return this;
    }

    /**
     * 不等于
     */
    public notEqual(target: AttrValue) {
        this._innerName += `${this.perfix()} != ${transAttrValue(target)}`;
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
    public less(target: AttrValue) {
        this._innerName += `${this.perfix()} < ${transAttrValue(target)}`;
        this.prevOpration = OperationWeight.less;
        return this._innerName;
    }

    /**
     * 大于
     */
    public over(target: AttrValue) {
        this._innerName += `${this.perfix()} > ${transAttrValue(target)}`;
        this.prevOpration = OperationWeight.over;
        return this._innerName;
    }

    /**
     * 大于等于
     */
    public overEqual(target: AttrValue) {
        this._innerName += `${this.perfix()} >= ${transAttrValue(target)}`;
        this.prevOpration = OperationWeight.overEqual;
        return this._innerName;
    }

    /**
     * 小于等于
     */
    public lessEqual(target: AttrValue) {
        this._innerName += `${this.perfix()} <= ${transAttrValue(target)}`;
        this.prevOpration = OperationWeight.lessEqual;
        return this._innerName;
    }

    /**
     * 介于
     */
    public between(start: AttrValue, end: AttrValue) {
        this._innerName += `${this.perfix()} = [${transAttrValue(start)}, ${transAttrValue(end)}]`;
        this.prevOpration = OperationWeight.between;
        return this._innerName;
    }

    /**
     * 不介于
     */
    public notBetween(start: AttrValue, end: AttrValue) {
        this._innerName += `${this.perfix()} != [${transAttrValue(start)}, ${transAttrValue(end)}]`;
        this.prevOpration = OperationWeight.notBetween;
        return this._innerName;
    }

    /**
     * 赋值
     */
    public setValue(value: AttrValue) {
        this.prevOpration = OperationWeight.setValue;
        return `${this._innerName} := ${transAttrValue(value)}`;
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
    return function (id?: AttrValue) {
        if (id == null) {
            return new BaseTrigger(name);
        }
        return new BaseTrigger(`${name}(${transAttrValue(id)})`);
    };
}