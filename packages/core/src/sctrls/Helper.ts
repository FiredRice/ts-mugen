import { currentWrite } from '../core';
import { Attributes } from '../triggers';
import { BasePostype, BaseSctrls, BaseValue, AttrValue } from '../types';
import { triggersToString, objectToString, transAttrValue, transStr, versionCheck } from '../utils';

interface HelperParams extends BaseSctrls {
    /**
     * 不推荐使用此参数,不支持使用player型的helper.
     * 
     * 如果helpertype = normal,则helper将被允许离开(走出)屏幕.
     * 
     * 此外,摄像机将不会因为要使helper停留在画面内而移动.(也就是说摄像机不会跟着helper走)
     * 
     * 如果helpertype = player,则helper将被约束在屏幕内且摄像机将跟随他移动,就像普通玩家一样.默认是normal.
     * 
     * 如果你想用helper来操纵摄像机,不要使用player型的helper.
     * 
     * 使用设置了"movecamera"参数的ScreenBound控制器可以代替.
     */
    helpertype?: 'normal' | 'player';
    /**
     * 指定helper的名字,必须写在双引号里面.
     * - 如果省略,此名字默认是"\<parent\>'s helper",这里的<parent>代表创建此helper的玩家的名字.
     */
    name?: string;
    /**
     * 指定这个helper将要被创建的位置.(x和y方向偏移量)
     * 
     * 这些参数的准确意义得依赖于postype.
     * - 默认是0,0.
     */
    pos?: [AttrValue, AttrValue];
    /**
     * 指定postype -- 如何解读pos参数.
     * 
     * 所有情况下,一个正的y偏移量意味着向下的位移.
     * 
     * 所有情况下,off_y是相对于玩家位置而言的.
     */
    postype?: BasePostype;
    /**
     * 如果postype是left或者right,设置facing为1将使helper朝右,值为-1使helper朝左.
     * 
     * 除了P2以外的其他postype值,如果facing是1,helper的朝向将和玩家一样.如果是-1,则与玩家朝向相反.
     * 
     * postype = p2这种情况下,facing的效果和上面一样,只是和P2的朝向有关而不是P1.
     * - 默认是1.
     */
    facing?: AttrValue;
    /**
     * 确定helper的初始状态号.
     * - 默认为0.
     * 
     * **[StateDef 0]一般是人物默认站立姿势,所以有时候对战时发现会突然多个人出来,就要检查一下是不是哪里创建了helper但是没有指定stateno.或者是创建了意料之外的helper而没有销毁.**
     */
    stateno: AttrValue;
    /**
     * 如果ctrl_flag是1,则helper能够接受玩家输入的指令.(例如键盘,手柄)
     * 
     * 同样,此helper将继承他根级(最顶级)的state -1.
     * 
     * 如果ctrl_flag是0,则helper不能访问输入的指令,且不能继承 state -1. 
     * - 默认值为0.
     */
    keyctrl?: AttrValue;
    /**
     * - 如果ownpal_flag是0,helper将受父级PalFX和RemapPal控制器影响.此为默认值.
     * - 如果ownpal_flag是1,helper将有自己暂时的色表,独立于他的父级.
     */
    ownpal?: AttrValue;
    /**
     * 强制色表从helper索引颜色图像重映射到指定的色表.
     * 
     * 此参数仅当ownpal_flag为非0时有效.
     * 
     * 如果dst_pal_grp是-1,此参数将被忽略.
     * - 默认-1,0.
     */
    remappal?: [AttrValue, AttrValue];
    /**
     * 这些参数与根级CNS文件相应参数意义相同.
     * 
     * 你能指定某几个参数将它们的值改变成适合helper的数值.
     * 
     * 否则,它们将从父级继承默认值.
     */
    size?: {
        /**
         * 水平方向缩放因数
         */
        xscale?: AttrValue;
        /**
         * 垂直方向缩放因数
         */
        yscale?: AttrValue;
        ground?: {
            /**
             * 玩家在地面时的后方宽度
             */
            back?: AttrValue;
            /**
             * 玩家在地面时的前方宽度
             */
            front?: AttrValue;
        };
        air?: {
            /**
             * 玩家在空中时的后方宽度
             */
            back?: AttrValue;
            /**
             * 玩家在空中时的前方宽度
             */
            front?: AttrValue;
        };
        /**
         * 玩家的高度 (对手能否跳过你的身体)
         */
        height?: AttrValue;
        proj?: {
            /**
             * 设置为1使得飞行道具也受xscale和yscale影响
             */
            doscale?: AttrValue;
        };
        head?: {
            /**
             * 近似头部位置
             */
            pos?: [AttrValue, AttrValue];
        };
        mid?: {
            /**
             * 近似中部位置
             */
            pos?: [AttrValue, AttrValue];
        };
        /**
         * 影子垂直偏移量像素值
         */
        shadowoffset?: AttrValue;
    };
    /**
     * 指定helper在SuperPause中不被冻结住的帧数.
     * - 默认为0.
     */
    supermovetime?: AttrValue;
    /**
     * 指定helper在Pause中不被冻结住的帧数.
     * - 默认为0.
     */
    pausemovetime?: AttrValue;
}

export default class Helper extends Attributes {
    private innerId: BaseValue;

    /**
     * @param id helper的ID号.默认是0.
     */
    public constructor(id: AttrValue = 0) {
        const _id = transAttrValue(id);
        super(`helper(${_id})`);
        this.innerId = _id;
    }

    /**
     * 设置此helper的ID号.
     * - 默认是0.
     */
    public get id() {
        return this.innerId;
    }

    /**
     * Helper
     * 
     * 创建玩家的另一个实例作为一个helper(援助)人物
     */
    public Create(params: HelperParams) {
        const {
            triggers,
            describe = '',
            version,
            stateno,
            name,
            ...others
        } = params;

        versionCheck(() => {
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
        }, version);
    }
}