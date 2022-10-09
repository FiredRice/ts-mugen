import { BaseValue, MoveType as MoveTypeValue, StateType as StateTypeValue } from '../types';

class BaseTypeModel<T = any> {
    private _innerName: BaseValue;

    constructor(name: BaseValue, perfix: string = '') {
        this._innerName = `${perfix}${name}`;
    }

    public get value() {
        return this._innerName;
    }

    public _setInnerName(name: BaseValue) {
        this._innerName = name;
    }

    /**
     * 等于
     */
    public equal(value: T) {
        return `${this._innerName} = ${value}`;
    }

    /**
     * 不等于
     */
    public notEqual(value: T) {
        return `${this._innerName} != ${value}`;
    }
}

export class HitDefAttr extends BaseTypeModel<string>{
    constructor(name: string, perfix: string = '') {
        super(name, perfix);
    }
}

export class MoveType extends BaseTypeModel<MoveTypeValue> {
    constructor(name: string, perfix: string = '') {
        super(name, perfix);
    }
}

export class StateType extends BaseTypeModel<StateTypeValue> {
    constructor(name: string, perfix: string = '') {
        super(name, perfix);
    }
}

export class TeamMode extends BaseTypeModel<'single' | 'simul' | 'turns'> {
    constructor(name: string, perfix: string = '') {
        super(name, perfix);
    }
}
