import { isObject } from 'lodash';
import { AttrValue } from '../types';

export class Triggers {
    private triggerAll = '';
    private triggerMap: any = {};
    private _innerIndex = 0;

    /**
     * 清空控制器所有条件
     */
    public clear() {
        this.triggerAll = '';
        this._innerIndex = 0;
        this.triggerMap = {};
    }

    /**
     * 追加 All 控制器
     * @param triggers 控制器
     * @return this
     */
    public appendAll(...triggers: AttrValue[]) {
        for (const trigger of triggers) {
            const value = isObject(trigger) ? trigger.value : trigger;
            this.triggerAll += `TriggerAll = ${value}\n`;
        }
        return this;
    }

    /**
     * 追加控制器，每次执行内置索引自增 1
     * - triggers 间的关系为【与】
     * - append 之间的关系为【或】
     * 
     * 例1：
     * ```ts
     * const triggers = new Triggers();
     * triggers.append(time.equal(0), time.less(10));
     * ```
     * 输出 =>
     * ```
     * trigger1 = time = 0
     * trigger1 = time < 10
     * ```
     * 例2：
     * ```ts
     * const triggers = new Triggers();
     * triggers.append(time.equal(0), time.less(10));
     * triggers.append(time.over(20));
     * ```
     * 输出 =>
     * ```
     * trigger1 = time = 0
     * trigger1 = time < 10
     * trigger2 = time > 20
     * ```
     * @param triggers 控制器
     * @return this
     */
    public append(...triggers: AttrValue[]) {
        this._innerIndex++;
        this.add(this._innerIndex, ...triggers);
        return this;
    }

    /**
     * 追加指定索引控制器。
     * ```ts
     * const triggers = new Triggers();
     * triggers.append(time.equal(0), time.less(10));
     * triggers.append(time.over(20));
     * triggers.add(1, anim.equal(2000));
     * ```
     * 输出 =>
     * ```
     * trigger1 = time = 0
     * trigger1 = time < 10
     * trigger1 = anim = 2000
     * trigger2 = time > 20
     * ```
     * @param index 
     * @param triggers 
     * @returns this
     */
    public add(index: number, ...triggers: AttrValue[]) {
        for (const trigger of triggers) {
            const value = isObject(trigger) ? trigger.value : trigger;
            this.triggerMap[index] = this.triggerMap[index] || '';
            this.triggerMap[index] += `trigger${index} = ${value}\n`;
        }
        return this;
    }

    public toString() {
        let triggerNums = '';
        Object.keys(this.triggerMap).sort((a, b) => Number(a) - Number(b)).forEach(key => {
            triggerNums += this.triggerMap[key];
        });
        return `${this.triggerAll}${triggerNums}`;
    }
}

/**
 * @returns 返回触发器实例
 */
export function useTriggers() {
    return new Triggers();
}

interface CreateTriggersParams {
    All?: AttrValue;
    [x: number]: AttrValue;
}

/**
 * 快速创建简易 triggers 的钩子函数
 * @returns 返回触发器实例
 */
export function createTriggers(params: CreateTriggersParams) {
    const triggers = useTriggers();
    Object.keys(params).forEach(key => {
        if (key === 'All') {
            triggers.appendAll(params[key]!);
        } else {
            triggers.add(Number(key) || 1, params[key]);
        }
    });
    return triggers;
}