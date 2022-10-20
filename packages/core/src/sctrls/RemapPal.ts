import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

export interface RemapPalParams extends BaseSctrls {
    /**
     * - 默认值 -1,0.
     */
    source: [AttrValue, AttrValue];
    /**
     * - 默认值 -1,0.
     */
    dest: [AttrValue, AttrValue];
}

/**
 * RemapPal 
 * 
 * 更换玩家的色表.
 * 
 * ---
 * - 所有使用source(原始的)色表的玩家图像素材将替代使用dest(目标的)色表绘制.
 * - source和dest色表必须存在于玩家图像素材之内,而且双方都必须有相同的色深.
 * - 如果src_pal_grp是-1,所有被索引的图像将被重映射到目标色表.仅影响相同色深的图像色表.其他存在的任何色表映射将移除.
 * - 如果dst_pal_grp是-1,原始色表的映射将移除.将dest的一对值设置为和source相同将有相同的效果.
 * ---
 * 示例：
 * ```
 * ; 所有使用(1,1)色表的图像素材将替换使用(1,3)色表来绘制.
 * type = RemapPal
 * source = 1,1
 * dest = 1,3
 * ```
 * ---
 * **注意：**
 * 
 * **色表映射是不可传递的,即,将1,0映射到2,0且2,0映射到3,0将不会造成1,0映射到3,0.**
 * 
 * **在1.1及以后的版本中,每个玩家将允许同时有8个不同的色表映射.**
 * 
 * **若source的值未被映射则之后调用RemapPal控制器将失败.**
 * 
 * **对于给定的一组source值设置dst_pal_grp为-1能移除未使用的映射.**
 */
export default function RemapPal(params: RemapPalParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = RemapPal\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}