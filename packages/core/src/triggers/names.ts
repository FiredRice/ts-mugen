import { BaseValue } from '../types';
import { transStr } from '../utils';
import { BasePerfix } from './base';

export class Name extends BasePerfix {
    private _innerName: BaseValue;

    public constructor(name: BaseValue, perfix: string = '') {
        super(perfix);
        this._innerName = `${this.getPerfix()}${name}`;
    }

    /**
     * 编译时的实际值
     */
    public get value() {
        return this._innerName;
    }

    public _setInnerName(name: BaseValue) {
        this._innerName = name;
    }

    /**
     * 等于
     */
    public equal(value: BaseValue) {
        return `${this._innerName} = "${transStr(value)}"`;
    }

    /**
     * 不等于
     */
    public notEqual(value: BaseValue) {
        return `${this._innerName} != "${transStr(value)}"`;
    }
}
