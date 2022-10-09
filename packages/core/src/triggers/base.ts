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

    public constructor(name: BaseValue, prevOpration: number = OperationWeight.none) {
        this._innerName = name;
        this.prevOpration = prevOpration;
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
        return new BaseTrigger(`${this._innerName} + ${transAttrValue(target)}`, OperationWeight.add);
    }

    /**
     * 减
     */
    public sub(target: AttrValue) {
        return new BaseTrigger(`${this._innerName} - ${transAttrValue(target)}`, OperationWeight.sub);
    }

    /**
     * 乘
     */
    public multiply(target: AttrValue) {
        return new BaseTrigger(`${this._innerName} * ${transAttrValue(target)}`, OperationWeight.multiply);
    }

    /**
     * 除
     */
    public division(target: AttrValue) {
        return new BaseTrigger(`${this._innerName} / ${transAttrValue(target)}`, OperationWeight.division);
    }

    /**
     * 取余
     */
    public remainder(target: AttrValue) {
        return new BaseTrigger(`${this._innerName} % ${transAttrValue(target)}`, OperationWeight.remainder);
    }

    /**
     * 幂运算
     */
    public pow(target: AttrValue) {
        return new BaseTrigger(`${this._innerName} ** ${transAttrValue(target)}`, OperationWeight.pow);
    }

    /**
     * 逻辑与运算
     */
    public and(target: AttrValue) {
        return new BaseTrigger(`${this._innerName} && ${transAttrValue(target)}`, OperationWeight.and);
    }

    /**
     * 逻辑或运算
     */
    public or(target: AttrValue) {
        return new BaseTrigger(`${this._innerName} || ${transAttrValue(target)}`, OperationWeight.or);
    }

    /**
     * 逻辑异或运算
     */
    public xor(target: AttrValue) {
        return new BaseTrigger(`${this._innerName} ^^ ${transAttrValue(target)}`, OperationWeight.xor);
    }

    /**
     * 按位取反运算符
     */
    public byteReversed(target: AttrValue) {
        return new BaseTrigger(`${this._innerName} ~ ${transAttrValue(target)}`, OperationWeight.byteReversed);
    }

    /**
     * 按位与运算符
     */
    public byteAnd(target: AttrValue) {
        return new BaseTrigger(`${this._innerName} & ${transAttrValue(target)}`, OperationWeight.byteAnd);
    }

    /**
     * 按位或运算符
     */
    public byteOr(target: AttrValue) {
        return new BaseTrigger(`${this._innerName} | ${transAttrValue(target)}`, OperationWeight.byteOr);
    }

    /**
     * 按位异或运算符
     */
    public byteXor(target: AttrValue) {
        return new BaseTrigger(`${this._innerName} ^ ${transAttrValue(target)}`, OperationWeight.byteXor);
    }

    /**
     * 等于
     */
    public equal(target: AttrValue) {
        return new BaseTrigger(`${this._innerName}${this.perfix()} = ${transAttrValue(target)}`, OperationWeight.equal);
    }

    /**
     * 不等于
     */
    public notEqual(target: AttrValue) {
        return new BaseTrigger(`${this._innerName}${this.perfix()} != ${transAttrValue(target)}`, OperationWeight.notEqual);
    }

    /**
     * 非
     */
    public not() {
        return new BaseTrigger(`!(${this._innerName})`, OperationWeight.not);
    }

    /**
     * 小于
     */
    public less(target: AttrValue) {
        return new BaseTrigger(`${this._innerName}${this.perfix()} < ${transAttrValue(target)}`, OperationWeight.less);
    }

    /**
     * 大于
     */
    public over(target: AttrValue) {
        return new BaseTrigger(`${this._innerName}${this.perfix()} > ${transAttrValue(target)}`, OperationWeight.over);
    }

    /**
     * 大于等于
     */
    public overEqual(target: AttrValue) {
        return new BaseTrigger(`${this._innerName}${this.perfix()} >= ${transAttrValue(target)}`, OperationWeight.overEqual);
    }

    /**
     * 小于等于
     */
    public lessEqual(target: AttrValue) {
        return new BaseTrigger(`${this._innerName}${this.perfix()} <= ${transAttrValue(target)}`, OperationWeight.lessEqual);
    }

    /**
     * 介于
     */
    public between(start: AttrValue, end: AttrValue) {
        return new BaseTrigger(`${this._innerName}${this.perfix()} = [${transAttrValue(start)}, ${transAttrValue(end)}]`, OperationWeight.between);
    }

    /**
     * 不介于
     */
    public notBetween(start: AttrValue, end: AttrValue) {
        return new BaseTrigger(`${this._innerName}${this.perfix()} != [${transAttrValue(start)}, ${transAttrValue(end)}]`, OperationWeight.notBetween);
    }

    /**
     * 赋值
     */
    public setValue(value: AttrValue) {
        return new BaseTrigger(`${this._innerName} := ${transAttrValue(value)}`, OperationWeight.setValue);
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