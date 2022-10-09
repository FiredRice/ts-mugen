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

export const name = new Name('Name');
export const p1Name = new Name('p1Name');
export const p2Name = new Name('p2Name');
export const p3Name = new Name('p3Name');
export const p4Name = new Name('p4Name');
export const authorName = new Name('AuthorName');
export const command  = new Name('Command');