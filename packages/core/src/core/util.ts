import { isObject } from 'lodash';
import { TriggerValue } from '../types';

/**
 * 创建触发器
 */
export function createTriggers() {
    let triggerMap: any = {};
    let triggerAll = '';

    /**
     * 添加触发器
     * @param index 索引 
     * @param trigger 触发器
     */
    function add(index: number | 'all', trigger: TriggerValue) {
        const value = isObject(trigger) ? `(${trigger.value})` : trigger;
        if (index === 'all') {
            triggerAll += `TriggerAll = ${value}\n`;
        } else {
            if (triggerMap[index] != null) {
                triggerMap[index] += ` && ${value}`;
            } else {
                triggerMap[index] = value;
            }
        }
    }

    /**
     * 清空触发器内容
     */
    function clean() {
        triggerAll = '';
        triggerMap = {};
    }

    function toString() {
        let result = triggerAll;
        const triggerKeys = Object.keys(triggerMap).sort((a, b) => Number(a) - Number(b));
        for (let i = 0; i < triggerKeys.length; i++) {
            const index = triggerKeys[i];
            result += `trigger${index} = ${triggerMap[index]}\n`;
        }
        return result;
    }

    return {
        add,
        clear: clean,
        toString
    };
}
