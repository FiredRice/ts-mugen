import { currentWrite } from '../core';
import { AttrValue, BasePostype, BaseSctrls, TransType } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface ExplodParams extends BaseSctrls {
    /**
     * 指定要播放的动画号.
     * 
     * 前缀'F'是可选的:如果包含了'F',则动画将从fight.def中播放.
     */
    anim: AttrValue;
    /**
     * 指定了此explod的ID号.
     * 
     * 用于识别在触发器和控制器中的特殊explod .
     */
    ID?: AttrValue;
    /**
     * 指定创建explod的坐标空间.space的有效值为:
     * - screen 此坐标空间映射到屏幕.左上角是0,0右下角是ScreenWidth,ScreenHeight(参见触发器).通过此空间创建的explod将不会受到视角移动或缩放的影响. 
     * - stage 此坐标空间映射到舞台空间.坐标0,0舞台地平线的中间.通过此空间创建的explod将会受到视角移动或缩放的影响.此为默认值. 
     */
    space?: 'screen' | 'stage';
    /**
     * 指定如何解释pos(位置)参数.在所有情况下,正的off_y表示向下位移.
     * 
     * 使用postype中的p1或p2将在舞台空间创建一个explod.
     * 
     * 使用front,back,left,right将在屏幕空间创建一个explod.
     * 
     * postype参数在1.1版本中被废弃,他的功能被space和bindID参数的组合以及ScreenWidth,ScreenHeight和测定边界的触发器取代.
     * 
     * 1.1中,替代postype的参数为:
     * ```
     * postype = p1
     * space = stage
     * pos = Pos X + CameraPos X, Pos Y
     * facing = facing 
     * 
     * postype = p2
     * space = stage
     * pos = (enemynear, Pos X) + CameraPos X, (enemynear, Pos Y)
     * facing = enemynear, facing
     * 
     * postype = front
     * space = screen
     * pos = ifelse(facing = -1, 0, ScreenWidth), 0
     * facing = 1 
     * 
     * postype = back
     * space = screen
     * pos = ifelse(facing = 1, 0, ScreenWidth), 0
     * facing = facing 
     * 
     * postype = left
     * space = screen
     * pos = 0, 0
     * facing = 1
     * 
     * postype = right
     * space = screen
     * pos = ScreenWidth, 0
     * facing = 1
     * ```
     * @deprecated
     */
    postype?: BasePostype | 'none';
    /**
     * - 如果explod未被束缚,off_x和off_y指定创建explod的位置.
     * - 如果explod被束缚,off_x和off_y指定到束缚点的偏移量.
     */
    pos?: [AttrValue, AttrValue];
    /**
     * 设置facing为1使得explod与正的off_x朝向一样,-1使得explod朝向相反
     * - 默认为1.
     */
    facing?: AttrValue;
    /**
     * 设置vfacing为-1使explod显示时垂直翻转,1表示显示的时候不翻转.
     * - 默认为1.
     */
    vfacing?: AttrValue;
    /**
     * 玩家或helper绑定的ID号.被束缚的explod位置相对于他要束缚的物体.
     * 
     * 指定-1(绑定到任何单独玩家)和-2(不绑定).
     * 
     * 如果bindID不是-2则需要给出bindtime参数.Screen空间的explod不能被束缚.
     * - 默认是-2.
     */
    bindID?: AttrValue;
    /**
     * 指定explod被束缚持续的游戏帧数.
     * 
     * bindtime过期后,explod将不再被束缚在这个绑定点,且将保持他的位置(除非被vel或accel参数影响).
     * 
     * 如果bindtime为-1,则explod将一直被束缚直到此explod被移除或者另一个控制器影响了bindtime.
     */
    bindtime?: AttrValue;
    /**
     * 指定explod初始的X和Y分量的速度.
     * 
     * 这些被解释为相对于explod的"facing"方向.
     * - 若省略则默认为0.
     */
    vel?: [AttrValue, AttrValue];
    /**
     * 指定explod初始的X和Y分量的加速度.
     * - 默认为0.
     */
    accel?: [AttrValue, AttrValue];
    /**
     * - 如果removetime是正数,explod将在被显示removetime帧数后被移除.
     * - 如果removetime是-1,explod将被永久显示.
     * - 如果removetime是-2,explod将在animtime到达0时移除.
     * - 默认为-2.
     */
    removetime?: AttrValue;
    /**
     * x_scale和y_scale指定用于explod水平和垂直方向的缩放因数.
     * - 如果省略则都默认为1.(不缩放)
     */
    scale?: [AttrValue, AttrValue];
    /**
     * sprpriority指定explod的绘制优先级.更高优先级的动画将绘制在较低优先级的动画上方.
     * 
     * 例如,设置sprpriority = -3时将使explod绘制在大多数人物和其他explod下方.大多数人物和explod的sprpriority都大于等于-2.
     * - 若省略,则默认为0.
     */
    sprpriority?: AttrValue;
    /**
     * angle指定explod绘制的角度.
     * - 默认为0.
     */
    angle?: AttrValue;
    /**
     * y_angle指定绘制出explod绕y轴旋转的角度.
     * - 默认为0.
     */
    yangle?: AttrValue;
    /**
     * x_angle指定绘制出explod绕x轴旋转的角度.
     * - 默认为0.
     */
    xangle?: AttrValue;
    /**
     * 设置 ontop = 1 使得explod绘制在所有图片层和背景层的上方.
     * 
     * 此参数优先于sprpriority.
     * - 默认为0.
     */
    ontop?: AttrValue;
    /**
     * 设置 under = 1 使得explod绘制在所有图片层和背景层的下方.
     * 
     * ---
     * **注意：**
     * **文档中并未明确提出该参数，但在 mugen 中似乎确实可生效，因此我也在此加上该参数**
     * @deprecated
     */
    under?: AttrValue;
    /**
     * 如果shadow不为0,将绘制阴影,否则不会.
     * - 默认为0.
     */
    shadow?: AttrValue;
    /**
     * - 如果ownpal_flag为0,explod颜色将被随后执行的PalFX和RemapPal控制器影响.通常情况下这是默认值.
     * - 如果ownpal_flag为1,explod颜色将不会被随后执行的PalFX和RemapPal控制器影响.
     * - 如果是从fightfx.air播放动画的,这是默认值.
     */
    ownpal?: AttrValue;
    /**
     * 强制色表从explod索引颜色图像重映射到指定的色表.
     * 
     * 此参数仅当ownpal_flag为非0且没有使用fight.def中的动画时有效.
     * 
     * 如果dst_pal_grp是-1,此参数将被忽略.
     * - 默认-1,0.
     */
    remappal?: [AttrValue, AttrValue];
    /**
     * 此值设置成1时如果玩家受到攻击将使explod被移除.
     * - 默认为0.
     */
    removeongethit?: AttrValue;
    /**
     * - 如果此值为1,explod将独立于创建它的玩家而播放动画.
     * - 如果设置成0,在玩家进入hitpause状态的时候explod将不会被更新.
     * - 默认为1.
     */
    ignorehitpause?: AttrValue;
    /**
     * 覆盖explod动画的透明度设定.查看Trans控制器获得详情.
     * - 如果trans_type是"addalpha"则"alpha"参数必须被指定.
     * - 若省略,什么也不做.
     */
    trans?: TransType;
    /**
     * 这是addalpha透明类型中alpha的 source(源) 和 destination(目标) 数值.
     * 
     * 有效值从0(低)到256(高).
     * - 缺省默认是256,0.(同air中的ASXXDXX.AS D 就是这个参数的缩写.)
     */
    alpha?: [AttrValue, AttrValue];
    /**
     * 使得explod的绑定点创建时被一个随机数取代.
     * 
     * rand_x指定x方向的替代范围,rand_y指定y方向的替代范围.
     * 
     * 例如,如果pos = 0,0和random = 40,80,则explod的x方向位置将是-20到19的一个随机数,y方向位置将是-40到39的一个随机数.
     * 
     * - 如果省略则这2个参数都为0.
     * @deprecated
     */
    random?: [AttrValue, AttrValue];
    /**
     * 此参数不推荐使用 -- 请使用supermovetime来代替.
     * 
     * 设置supermove = 1使得explod一直持续直到超级暂停结束,无论removetime如何设置.
     * - 默认为0.
     * @deprecated
     */
    supermove?: AttrValue;
    /**
     * 指定explod在SuperPause中将不被冻结的帧数.
     * 
     * 当在SuperPause中想让explod做动画的时候使用,例如自定义的超级火花.
     * - 默认为0.
     */
    supermovetime?: AttrValue;
    /**
     * 指定explod在Pause中将不被冻结的帧数.
     * - 默认为0.
     */
    pausemovetime?: AttrValue;
}

/**
 * Explod 
 * 
 * 显示诸如火花,尘土以及其他视觉效果动画的灵活工具.
 * 
 * 它的功能包含了目前不推荐使用的GameMakeAnim控制器.
 * 
 * ---
 * **注意：**
 * 
 * **一个束缚于玩家的explod的位置仅当所有玩家完成更新后才被决定.(对比helper,当控制器被执行时,helper是相对于玩家的即时位置被创建的)**
 * 
 * **此特征对explod正确绑定到玩家的屏幕位置是必要的.**
 * 
 * **例如,假定玩家的位置是(160,0),x方向速度为5.**
 * 
 * **如果一个相对于P1偏移量为0,0的explod被创建,则此explod实际屏幕位置将是165,0.**
 */
export function Explod(params: ExplodParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = Explod\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}

/**
 * ModifyExplod 
 * 
 * 修改现有的Explod的参数.基本语法和Explod相同.然而,此控制器以后可能改动.
 * - 依赖于此控制器的任何代码在以后不保证可以正常工作.
 * - 对某些explod的参数貌似无效.
 */
export function ModifyExplod(params: ExplodParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = ModifyExplod\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}