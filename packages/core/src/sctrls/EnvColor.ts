import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils/index';

interface EnvColorParams extends BaseSctrls {
    /**
     * 指定要将屏幕设置成某种颜色的R,G,B数值分量.
     * 
     * 每个数值应该是一个0-255之间的整数.数字越大,环境色中此成分的颜色将会越多.
     * 
     * - 默认值为255,255,255.(纯白)
     */
    value?: [AttrValue, AttrValue, AttrValue];
    /**
     * 指定环境色将被显示的时间帧数.
     * 
     * - 默认为1帧.设置-1则EnvColor将永久持续.
     */
    time?: AttrValue;
    /**
     * 设置under为1使得环境色在人物和飞行道具下面绘制.
     * 
     * 换句话说,人物和飞行道具在着色背景上将可见.(也就是说EnvColor的效果将在所有人物和飞行道具的下层而不会遮挡人物和飞行道具的显示.)
     * 
     * - 默认为0.
     */
    under?: AttrValue;
}

/**
 * EnvColor 
 * 
 * 将整个屏幕变为一种纯色,前景层中打击火花和设置了"ontop"参数的explod除外.
 * 
 * 舞台的前景层将不可见.
 */
export default function EnvColor(params: EnvColorParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = EnvColor\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}