import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils/index';

interface AfterImageTimeParams extends BaseSctrls {
    /**
     * 设置残影在被移除前显示的新的帧数.
     * 
     * 一般设置time=0去除残影效果
     */
    time?: AttrValue;
    /**
     * 代替语法: value = new_duration (整型)
     */
    value?: AttrValue;
}

/**
 * AfterImageTime 
 * 
 * 改变玩家残影效果的持续时间,如果当前有此效果
 * - 如果当前没有残影效果,此控制器无效.
 * - 已经得知的bug：如果原来的AfterImage控制器中timegap参数没有被设置成1,AfterImageTime将引起画面位置被重置.
 */
export default function AfterImageTime(params: AfterImageTimeParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = AfterImageTime\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}