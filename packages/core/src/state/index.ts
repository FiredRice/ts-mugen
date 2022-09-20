import { isArray } from 'lodash';
import { currentWrite } from '../core/index';
import { Attributes, BaseTrigger } from '../triggers';
import { BasePostype, BaseSctrls, BaseValue, MBoolean, MoveType, StateType } from '../types';
import { objectToString, triggersToString } from '../utils';

interface Statedef {
    id: BaseValue;
    describe?: string;
    type: StateType;
    movetype: MoveType;
    physics: 'S' | 'C' | 'A' | 'N' | 'U';
    anim: BaseValue;
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
    private idTrigger: BaseTrigger;

    /**
     * 创建一个 state
     * - id 状态号
     * - describe 描述
     * - ...others 其余参数详见官方文档
     */
    public constructor(statedef: Statedef) {
        this.statedef = statedef;
        this.idTrigger = new BaseTrigger(statedef.id);
    }

    /**
     * 附加内容
     * @param callbacks 
     */
    public push(callbacks: CallbackFun | CallbackFun[]) {
        if (isArray(callbacks)) {
            this.commands.push(...callbacks);
        } else {
            this.commands.push(callbacks);
        }
        return this;
    }

    /**
     * 状态号
     */
    public get id() {
        return this.idTrigger;
    }

    public toString() {
        const { id, describe = '', ...otherParams } = this.statedef;
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
}

interface HelperParams extends BaseSctrls {
    helpertype?: 'normal' | 'player';
    name?: string;
    id?: BaseValue;
    pos?: [BaseValue, BaseValue];
    postype?: BasePostype;
    facing?: 1 | -1;
    stateno?: BaseValue;
    keyctrl?: MBoolean;
    ownpal?: MBoolean;
    remappal?: [BaseValue, BaseValue];
    size?: {
        xscale?: BaseValue;
        yscale?: BaseValue;
        ground?: {
            back?: BaseValue;
            front?: BaseValue;
        };
        air?: {
            back?: BaseValue;
            front?: BaseValue;
        };
        height?: BaseValue;
        proj?: {
            doscale?: BaseValue;
        };
        head?: {
            pos?: [BaseValue, BaseValue];
        };
        mid?: {
            pos?: [BaseValue, BaseValue];
        };
        shadowoffset?: BaseValue;
    };
}

export class Helper extends Attributes {
    private statedef: Statedef;
    private commands: CallbackFun[] = [];
    private idTrigger: BaseTrigger;

    /**
     * 创建一个 state ，但该 state 可作为一个 helper 使用
     * - id 状态号
     * - describe 描述
     */
    public constructor(statedef: Statedef) {
        super(`helper(${statedef.id})`);
        this.statedef = statedef;
        this.idTrigger = new BaseTrigger(statedef.id);
    }

    /**
     * Helper
     * - 创建玩家的另一个实例作为一个helper(援助)人物
     */
    public create(params: HelperParams) {
        const { id: baseId } = this.statedef;
        const {
            triggers,
            describe = '',
            stateno = baseId,
            id = baseId,
            name,
            ...others
        } = params;

        this.setPerfix(`helper(${id})`);
        this.idTrigger._setInnerName(id);
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = Helper\n`;
        result += triggersToString(triggers);
        result += `stateno = ${stateno}\n`;
        result += `id = ${id}\n`;
        if (!!name) {
            result += `name = "${name}"\n`;
        }
        result += objectToString(others);
        currentWrite.append(result);
    }


    /**
     * 附加内容
     * @param callbacks 
     */
    public push(callbacks: CallbackFun | CallbackFun[]) {
        if (isArray(callbacks)) {
            this.commands.push(...callbacks);
        } else {
            this.commands.push(callbacks);
        }
        return this;
    }

    /**
     * helper 状态号或创建 helper 时 id 的真实值
     */
    public get id() {
        return this.idTrigger;
    }

    public toString() {
        const { id, describe = '', ...otherParams } = this.statedef;
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
}