import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface PalFXParams extends BaseSctrls {
    /**
     * 指定色表效果将持续的时间.(帧数)
     * - 指定-1使色表效果永久持续.
     * - 指定0停止任何正在起作用的色表效果.
     */
    time?: AttrValue;
    /**
     * 每部分add参数的分量被加到玩家色表相对应的分量上,结果乘以相对应的mul参数分量除以256.(提供算法)
     * 
     * 例如,如果pal_r是人物原色表的红色分量值,则新的红色分量值是(pal_r + add_r) * mul_r / 256.
     * 
     * mul的值必须>=0.3个参数的默认值不变,例如 add = 0,0,0 且 mul = 256,256,256.
     */
    add?: [AttrValue, AttrValue, AttrValue];
    /**
     * 每部分add参数的分量被加到玩家色表相对应的分量上,结果乘以相对应的mul参数分量除以256.(提供算法)
     * 
     * 例如,如果pal_r是人物原色表的红色分量值,则新的红色分量值是(pal_r + add_r) * mul_r / 256.
     * 
     * mul的值必须>=0.3个参数的默认值不变,例如 add = 0,0,0 且 mul = 256,256,256.
     */
    mul?: [AttrValue, AttrValue, AttrValue];
    /**
     * 创建一个附加正弦波的色表加成效果.
     * 
     * period指定了正弦波的周期(单位是帧数),amplitude参数控制正弦波每个分量的振幅.
     * 
     * 例如,如果t表示从PalFX控制器激活时逝去的帧数,pal_r是人物原色表中红色分量值,则t时间点人物色表红色分量值为(pal_r + add_r + ampl_r * sin(2 * pi * t / period)) * mul_r / 256.
     */
    sinadd?: [AttrValue, AttrValue, AttrValue] | [AttrValue, AttrValue, AttrValue, AttrValue];
    /**
     * 如果invertall非0,则色表中的颜色会倒置,创建"电影底片"效果.
     * 
     * 颜色倒置在add和mul生效前起作用.
     * - 默认是0.
     */
    invertall?: AttrValue;
    /**
     * 此参数影响色表的色彩级别(饱和度).如果值为0,色表将会是灰度的.
     * 
     * 如果值为256,则色表中的颜色将不改变.0-256之间的值将会有过渡效果.
     * 
     * 此参数在invertall,add,mul生效前起作用.值必须在[0,256]范围里.
     * - 默认值为256.
     */
    color?: AttrValue;
}

/**
 * PalFX 
 * 
 * 提供色表的临时效果.这些效果将会同时影响此玩家拥有的explod和helper的色表,除非它们已指定ownpal为非零.
 */
export function PalFX(params: PalFXParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = PalFX\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}

/**
 * AllPalFX 
 * 
 * 与PalFX相似,只是AllPalFX影响背景和血条以及所有人物和爆炸火花的色表.(无论ownpal参数如何设定)
 */
export function AllPalFX(params: PalFXParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = AllPalFX\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}

/**
 * BGPalFX 
 * 
 * 与PalFX相同,只是BGPalFX影响背景和血条的色表而不是人物的色表.
 */
export function BGPalFX(params: PalFXParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = BGPalFX\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}