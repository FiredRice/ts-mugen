import { currentWrite } from '../core';
import { AttrValue, BaseSctrls, TransType } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils/index';

export interface AfterImageParams extends BaseSctrls {
    /**
     * 指定残影将被显示的帧数.
     * 
     * 设置-1将被永久显示.
     * - 默认值为1
     */
    time?: AttrValue;
    /**
     * 设置画面历史缓存区的容量.历史缓存区将容纳no_of_frames幅人物最近保存的画面.
     * 
     * 假设timegap和framegap是常数,增加长度能增加一段时间中残影显示的数量和"寿命"(缺少更好的词来形容).
     * 
     * - 最大长度是60,默认是20
     */
    length?: AttrValue;
    /**
     * 决定了应用到所有残影上的色表效果
     * - 色彩等级通过palcolor的值调整,然后如果palinvertall的值是非0则颜色会反向
     * - palbright分量增加到玩家色表的相对应分量之上,每一分量乘以相对应的palcontrast分量除以256,最后加上palpostbright的分量
     * - palcolor取值范围是0(灰度)到256(正常色).
     * - 例如,如果人物色表上的红色分量记作pal_r,那么残影色表上红色分量就是(pal_r + add_r) * mul_r / 256 + add2_r,假定palcolor和palinvert保留默认值.
     * - 有效值 0-256
     */
    palcolor?: AttrValue;
    /**
     * 决定了应用到所有残影上的色表效果
     * - 非 0 则颜色会反向
     */
    palinvertall?: AttrValue;
    /**
     * 决定了应用到所有残影上的色表效果
     * - palbright分量增加到玩家色表的相对应分量之上,每一分量乘以相对应的palcontrast分量除以256,最后加上palpostbright的分量
     * - 分量有效值 0-255
     */
    palbright?: [AttrValue, AttrValue, AttrValue];
    /**
     * 决定了应用到所有残影上的色表效果
     * - palbright分量增加到玩家色表的相对应分量之上,每一分量乘以相对应的palcontrast分量除以256,最后加上palpostbright的分量
     * - 分量有效值 0-255
     */
    palcontrast?: [AttrValue, AttrValue, AttrValue];
    /**
     * 决定了应用到所有残影上的色表效果
     * - palbright分量增加到玩家色表的相对应分量之上,每一分量乘以相对应的palcontrast分量除以256,最后加上palpostbright的分量
     * - 分量有效值 非负整数
     */
    palpostbright?: [AttrValue, AttrValue, AttrValue];
    /**
     * 指定了多次应用到残影连续画面的色表效果
     * - 在一个色表效果的应用中,首先paladd分量被加到残影的色表上,然后此分量乘以palmul的分量.
     * - 这些效果应用方式如下：
     * - 最新的残影画面没有效果,第2新的残影画面应用1次,第3新的残影画面应用2次,等等.
     * - 分量有效值 0-255
     */
    paladd?: [AttrValue, AttrValue, AttrValue];
    /**
     * 指定了多次应用到残影连续画面的色表效果
     * - 在一个色表效果的应用中,首先paladd分量被加到残影的色表上,然后此分量乘以palmul的分量.
     * - 这些效果应用方式如下：
     * - 最新的残影画面没有效果,第2新的残影画面应用1次,第3新的残影画面应用2次,等等.
     * - 分量有效值 任何非负浮点数
     */
    palmul?: [AttrValue, AttrValue, AttrValue];
    /**
     * 保存玩家画面至历史缓存区并作为残影显示 此过程中跳过的画面数.
     * - 默认值 1 (不跳过任何画面)
     * - 如果每3幅画面保存一次(举个例子),你将使用timegap = 3
     */
    timegap?: AttrValue;
    /**
     * 历史缓存区中每value幅画面将被当成残影显示.
     * 
     * 例如,如果framegap = 4(默认值),则第1幅,第5幅,第9幅...历史缓存区中的画面将被当做残影显示.
     */
    framegap?: AttrValue;
    /**
     * 指定残影的透明模式.
     * 
     * 有效值类型为"none"(不透明),"add","add1","sub".
     * - 默认为"none" (详见trans控制器)
     */
    trans?: TransType;
}

/**
 * AfterImage 
 * 
 * 实现玩家的残影效果
 * 
 * 人物的画面存入一个历史缓存区,一段时间之后作为残影被显示出来.
 */
export default function AfterImage(params: AfterImageParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = AfterImage\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}