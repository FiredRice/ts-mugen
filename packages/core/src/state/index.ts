import { getVersion } from '@tsmugen/utils';
import { isArray } from 'lodash';
import { currentWrite } from '../core/index';
import { BaseValue, MBoolean, MoveType, StateType, Version } from '../types';
import { objectToString } from '../utils';

interface Statedef {
    id: BaseValue;
    describe?: string;
    version?: Version;
    type?: StateType;
    movetype?: MoveType;
    physics?: 'S' | 'C' | 'A' | 'N' | 'U';
    anim?: BaseValue;
    velset?: BaseValue | [BaseValue, BaseValue];
    ctrl?: MBoolean;
    sprpriority?: BaseValue;
    poweradd?: BaseValue;
    facep2?: MBoolean;
    hitdefpersist?: MBoolean;
    movehitpersist?: MBoolean;
    hitcountpersist?: MBoolean;
    juggle?: BaseValue;
}

type CallbackFun = (stateInfo: Statedef) => void;

export class State {
    private statedef: Statedef;
    private commands: CallbackFun[] = [];

    /**
     * 创建一个 state ，但该 state 可作为一个 helper 使用
     * - id 状态号
     * - describe 描述
     */
    public constructor(statedef: Statedef) {
        this.statedef = statedef;
    }

    /**
     * 状态号真实值
     */
    public get id() {
        return this.statedef.id;
    }


    /**
     * 追加控制器
     * @param callbacks 
     */
    public appendControllers(callbacks: CallbackFun | CallbackFun[]) {
        if (isArray(callbacks)) {
            this.commands.push(...callbacks);
        } else {
            this.commands.push(callbacks);
        }
        return this;
    }

    public toString() {
        const { id, describe = '', version, ...otherParams } = this.statedef;
        if (version == null || version === getVersion()) {
            let result = `[Statedef ${id}]\n`;
            if (!!describe) {
                result = `; ${describe}\n${result}`;
            }
            result += `${objectToString(otherParams)}\n`;
            currentWrite.clean();
            currentWrite.currentStateId = id;
            this.commands.forEach(call => {
                call(this.statedef);
            });
            result += currentWrite.getCode();
            currentWrite.clean();
            return result;
        }
        return '';
    }
}