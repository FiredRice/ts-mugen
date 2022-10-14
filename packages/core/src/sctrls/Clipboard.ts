import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, transStr, triggersToString, versionCheck } from '../utils';

interface DisplayToClipboardParams extends BaseSctrls {
    /**
     * 一个printf格式字符串型,所以如果你对printf了解,你可以跳过这段描述.
     * 
     * 此格式字符串包含了任何你想要显示的文字.
     * 
     * 你也可以使用 \n 生成一个换行符, \t 生成一个tab字符(tab的宽度等于4个字符宽度).
     * 
     * 如要显示一个算术表达式的值,你得放入 %d(显示整型) 或者 %f(显示浮点型) 格式字符串,然后在参数列表中指定表达式.
     * 
     * 如要显示 % 字符,你必须放入 %% 格式字符串.
     * 
     * 只有指定的有符号整数和浮点型格式被接受: 
     * - %d(有符号十进制整数)
     * - %i(同%d)
     * - %f(浮点数,十进制记数法)
     * - %F(貌似什么也不显示)
     * - %e(用科学计数法表示的浮点数)
     * - %E(同%e)
     * - %g(浮点数,不显示无意义的0)
     * - %G(基本同%g)
     * 
     * 不支持长修饰格式.(例如,%lld)
     * 
     * 认可的转义字符为 \n(换行符),\t(水平制表符 Tab键),\\(反斜杠字符)和\"(双引号字符).
     */
    text?: string;
    /**
     * 最多指定6个格式字符串作为数值参数
     * 
     * 这些应该被整齐的列在params项目之下.
     * 
     * 每个参数的格式必须与指定格式相匹配.
     * 
     * 你不能指定多于或者少于被调用的格式字符串参数
     * 
     * 如果指定格式和实际提供的参数不匹配,则实际参数的值将以适当(对那种类型来说)格式显示出来,使用默认的格式化选项.
     */
    params?: AttrValue[];
}

/**
 * DisplayToClipboard 
 * 
 * 清空玩家的剪贴板,打印出指定信息.
 * 
 * 此控制器仅用于调试.
 * 
 * 在调试模式中能够显示出玩家的剪贴板(按Ctrl+D).
 * 
 * ---
 * 注：通常作Debug用,但也可以用来显示作者自定义信息.
 */
export function DisplayToClipboard(params: DisplayToClipboardParams) {
    const { triggers, describe = '', version, text = '', ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = DisplayToClipboard\n`;
        result += triggersToString(triggers);
        result += `text = "${transStr(text)}"\n`;
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}

/**
 * AppendToClipboard 
 * 
 * 此控制器与DisplayToClipboard相似,只是另起新的一行而不是覆盖剪贴板上已经存在的文字.
 * 
 * 通常作Debug用,但也可以用来显示作者自定义信息.
 */
export function AppendToClipboard(params: DisplayToClipboardParams) {
    const { triggers, describe = '', version, text = '', ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = AppendToClipboard\n`;
        result += triggersToString(triggers);
        result += `text = "${transStr(text)}"\n`;
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}

/**
 * ClearClipboard 
 * 
 * 清除玩家当前剪贴板上任何文字.
 */
export function ClearClipboard(params: BaseSctrls) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = ClearClipboard\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}