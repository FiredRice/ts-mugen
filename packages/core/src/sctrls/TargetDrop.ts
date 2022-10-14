import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface TargetDropParams extends BaseSctrls {
    /**
     * 任何ID号不等于id_no的目标将从玩家的目标列表中被丢弃.
     * - 默认为-1.(丢弃所有目标)
     */
    excludeID?: AttrValue;
    /**
     * - 如果keep_flag是非0,则至少在玩家目标列表中保留一个目标.
     * - 如果有多个目标他们的ID号都等于id_no,将随机保留一个目标其余的都将丢弃.此特征在投掷中有用,用来阻止同时投掷多个对手.
     * - 如果keep_flag是0,则此相应ID号的所有目标将被保留.
     * - 默认是1.
     */
    keepone?: AttrValue;
}

/**
 * TargetDrop 
 * 
 * 丢弃玩家目标列表中的所有目标,除了像那些有指定ID号的目标.
 * 
 * 对仅给某些目标提供效果时有用.
 */
export default function TargetDrop(params: TargetDropParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = TargetDrop\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}