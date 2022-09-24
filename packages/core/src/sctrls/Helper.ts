import { currentWrite } from '../core';
import { Attributes } from '../triggers';
import { BasePostype, BaseSctrls, BaseValue, AttrValue } from '../types';
import { triggersToString, objectToString, transAttrValue, transStr } from '../utils';

interface HelperParams extends BaseSctrls {
    helpertype?: 'normal' | 'player';
    name?: string;
    pos?: [AttrValue, AttrValue];
    postype?: BasePostype;
    facing?: AttrValue;
    stateno: AttrValue;
    keyctrl?: AttrValue;
    ownpal?: AttrValue;
    remappal?: [AttrValue, AttrValue];
    size?: {
        xscale?: AttrValue;
        yscale?: AttrValue;
        ground?: {
            back?: AttrValue;
            front?: AttrValue;
        };
        air?: {
            back?: AttrValue;
            front?: AttrValue;
        };
        height?: AttrValue;
        proj?: {
            doscale?: AttrValue;
        };
        head?: {
            pos?: [AttrValue, AttrValue];
        };
        mid?: {
            pos?: [AttrValue, AttrValue];
        };
        shadowoffset?: AttrValue;
    };
    supermovetime?: AttrValue;
    pausemovetime?: AttrValue;
}

export default class Helper extends Attributes {
    private innerId: BaseValue;

    public constructor(id: AttrValue) {
        const _id = transAttrValue(id);
        super(`helper(${_id})`);
        this.innerId = _id;
    }

    public get id() {
        return this.innerId;
    }

    /**
     * Helper
     * - 创建玩家的另一个实例作为一个helper(援助)人物
     */
    public create(params: HelperParams) {
        const {
            triggers,
            describe = '',
            stateno,
            name,
            ...others
        } = params;

        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = Helper\n`;
        result += triggersToString(triggers);
        result += `stateno = ${stateno}\n`;
        result += `id = ${this.innerId}\n`;
        if (!!name) {
            result += `name = "${transStr(name)}"\n`;
        }
        result += objectToString(others);
        currentWrite.append(result);
    }
}