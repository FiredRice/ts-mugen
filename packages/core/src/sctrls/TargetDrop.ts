import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString } from '../utils/index';

interface TargetDropParams extends BaseSctrls {
    excludeID?: AttrValue;
    keepone?: AttrValue;
}

/**
 * TargetDrop 
 * - 丢弃玩家目标列表中的所有目标,除了像那些有指定ID号的目标.
 * - 对仅给某些目标提供效果时有用.
 */
export default function TargetDrop(params: TargetDropParams) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = TargetDrop\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}