import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, transStr, triggersToString } from '../utils';

interface DisplayToClipboardParams extends BaseSctrls {
    text?: string;
    params?: AttrValue[];
}

/**
 * DisplayToClipboard 
 * - 此控制器仅用于调试.
 * - DisplayToClipboard清空玩家的剪贴板,打印出指定信息.
 * - 在调试模式中能够显示出玩家的剪贴板(按Ctrl+D).
 */
export function DisplayToClipboard(params: DisplayToClipboardParams) {
    const { triggers, describe = '', text = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = DisplayToClipboard\n`;
    result += triggersToString(triggers);
    result += `text = "${transStr(text)}"\n`;
    result += objectToString(others);
    currentWrite.append(result);
}

/**
 * AppendToClipboard 
 * - 此控制器与DisplayToClipboard相似,只是另起新的一行而不是覆盖剪贴板上已经存在的文字.
 */
export function AppendToClipboard(params: DisplayToClipboardParams) {
    const { triggers, describe = '', text = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = AppendToClipboard\n`;
    result += triggersToString(triggers);
    result += `text = "${transStr(text)}"\n`;
    result += objectToString(others);
    currentWrite.append(result);
}

/**
 * ClearClipboard 
 * - 清除玩家当前剪贴板上任何文字.
 */
export function ClearClipboard(params: BaseSctrls) {
    const { triggers, describe = '', ...others } = params;
    let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
    result += `type = ClearClipboard\n`;
    result += triggersToString(triggers);
    result += objectToString(others);
    currentWrite.append(result);
}