import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils/index';

interface AfterImageTimeParams extends BaseSctrls {
    time?: AttrValue;
    value?: AttrValue;
}

/**
 * AfterImageTime 
 * - 改变玩家残影效果的持续时间,如果当前有此效果
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