import { getVersion } from '@tsmugen/utils';
import { currentWrite } from '../core/index';
import { BaseValue, MBoolean, MoveType, StateType, Version } from '../types';
import { objectToString } from '../utils';

export interface Statedef {
    /**
     * 状态号
     */
    id: BaseValue;
    /**
     * 状态描述，用于输出注释
     */
    describe?: string;
    /**
     * 状态匹配版本。
     * 
     * 不传默认匹配所有版本
     */
    version?: Version;
    /**
     * 这是P1在这个状态中的状态类型.定义了他是站立,蹲下,在空中,还是躺着.
     * 
     * 相对应的字母分别是"S", "C" , "A" 和 "L"(不带引号).
     * 
     * 要保持上一个状态的状态类型,使用"U".如果缺省这行,则假定为"S".
     * 
     * 你将经常用到"S","C"和"A".例如,一个蹲下的状态类型必须是下面这行:
     * ```
     * type = C 
     * ```
     * 这个状态用来决定几个因素,最重要的,P1被击中时将是什么反应.
     * 
     * 例如,在站立类型状态中,P1将作出犹如站在地面上一样的反应.
     * 
     * 如果类型是"空中",则P1将作出相应的受击反应.
     */
    type?: StateType;
    /**
     * P1招式的类型:"A"表示攻击,"I"表示空闲,"H"表示受击.
     * 
     * 要保持上一个状态的招式类型,使用"U".如果缺省这行,则假定为"I".
     * 
     * "A"和"H"应该不言自明."I"用于P1既不攻击也不受击的状态.
     * 
     * 例如,一个攻击状态应该是下面这行:
     * ```
     * movetype = A
     * ```
     * 你需要指定招式类型以便程序知道如何处理这个状态.
     * 
     * 错误的指定招式类型也许会导致P1行动不正确.
     */
    movetype?: MoveType;
    /**
     * 你需要指定在此状态中的物理属性.
     * 
     * 有效值是,"S"表示站立,"C"表示蹲下,"A"表示空中,"N"表示无.
     * 
     * 要保持上一个状态的物理属性,使用"U".如果缺省这行,则假定为"N".
     * 
     * 物理属性的种类用来决定P1的行为特征.
     * 
     * - 对"S"物理属性来说,P1将经受地面摩擦力.摩擦力系数设置在player的变量中.
     * - 对"C"物理属性来说,P1将经受摩擦力,就像"S"状态.
     * - 对"A"物理属性来说,P1将加速向下,如果他的y方向位置大于0(即,他触及了地面),他将立即进入落地状态. 
     * - 如果你使用"N",P1将不会有这些程序设定的物理状态.
     * 
     * 不要把"physics"和"type"混淆.通常他们是相同的,但是给了你更好控制人物的机会.
     * 
     * 例如,你也许会选择使用"N"(没有物理属性),且在空中状态中指定你自己的加速度和落地检测.
     */
    physics?: 'S' | 'C' | 'A' | 'N' | 'U';
    /**
     * 此参数改变P1的动画.指定动作号.
     * 
     * 如果你不想在状态开始时改变P1的动画,缺省这个参数.
     * 
     * 在400号状态中,玩家正在进行一个蹲下的攻击,动作号为400,典型参数是:
     * ```
     * [Statedef 400]
     * type = c
     * movetype = a
     * physics = c
     * anim = 400 
     * ```
     */
    anim?: BaseValue;
    /**
     * 你能使用velset来设置状态起始时P1的速度.
     * 格式是一对数字,分别代表x和y方向速度.
     * 缺省将不改变P1原来速度.例如:
     * ```
     * velset = 4,-8
     * ```
     * 使P1向上,向前移动.
     * 
     * 这里有个特例.即使你设置了velset=0,在版边攻击P2的时候P1将被弹开.
     */
    velset?: BaseValue | [BaseValue, BaseValue];
    /**
     * 此参数将设置P1是否受控制.0表示不受控制,1表示受控制.
     * 
     * 若缺省,P1的控制状态将保持上一状态不变.例如,给P1控制权,使用
     * ```
     * ctrl = 1 
     * ```
     */
    ctrl?: MBoolean;
    /**
     * 如果使用这个参数,玩家的(图片)素材优先层级将被设置为指定的值.
     * 
     * 如果缺省, 图片优先级将保持不变.common1.cns(共用cns文件)定义了站立,蹲下时人物的图像优先级是0,跳跃时是1.
     * 
     * 对于大多数攻击状态,应该设置sprpriority = 2,以便攻击显示在上层.
     * 
     * 查看sctrls中的SprPriority文档,了解如何使用控制器来改变图像优先级.
     */
    sprpriority?: BaseValue;
    /**
     * 包含这个参数时,poweradd参数将被加到玩家的能量条中.poweradd值是一个数字,可正可负.
     * 
     * 此参数典型的被用在攻击招式中,你想让玩家通过攻击来获得能量.例如,增加40能量,打上
     * ```
     * poweradd = 40 
     * ```
     */
    poweradd?: BaseValue;
    /**
     * 当包含了facep2 = 1,玩家将在状态开始的时候转向对手.
     * 
     * facep2缺省默认值为0.
     */
    facep2?: MBoolean;
    /**
     * 如果设置为1,任何从一个状态过渡到这个状态时激活中的HitDef将任然处于激活中.
     * 
     * 如果设置为0,默认值,当状态过渡完成后任何上述情况的HitDef将无效.
     * 
     * (HitDef的作用被延续到下一个状态,原本HitDef只在一个状态内起作用)
     */
    hitdefpersist?: MBoolean;
    /**
     * 如果设置为1,上一个状态中招式击中的信息(无论是击中,miss,被防住等,详见"Move*"触发器)将延续到这个状态.
     * 
     * 如果设置为0(默认值),此信息将在进入这个状态时复位.
     * 
     * (Move*系列 的作用被延续到下一个状态,原本Move*系列只在一个状态内起作用)
     */
    movehitpersist?: MBoolean;
    /**
     * 如果设置为1,连击数(这次攻击完成了多少hit)将被从上一个状态延续到这个状态.
     * 
     * 如果设置为0(默认值),连击数将在状态过渡后复位.
     * 
     * 此参数不会影响显示在屏幕上的连击计数器.
     * 
     * 查看HitCount和UniqHitCount触发器文档,了解如何检测连击数.
     */
    hitcountpersist?: MBoolean;
    /**
     * juggle参数仅在攻击中起作用.指定了招式需要的连击点数.
     * 
     * 若在攻击中缺省,则如果上一个攻击状态成功连击了,这次攻击也将连击.
     * 
     * 你应该再所有的攻击中都指定juggle参数.
     * 
     * 如果一个攻击跨越多个状态,只需要在攻击的第一个状态中设置juggle参数
     */
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
    public appendControllers(...callbacks: CallbackFun[]) {
        this.commands.push(...callbacks);
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

/**
 * 原生代码
 * - 仅与 states 一并注入到角色中
 * @param code 
 * @param version 匹配版本号
 */
export function NativeStates(code: string, version?: Version) {
    if (version == null || version === getVersion()) {
        return `${code}\n`;
    }
    return '';
}