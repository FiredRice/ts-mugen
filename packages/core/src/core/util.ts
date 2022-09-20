import isObject from 'lodash/isObject';
import { MugenConfig, TriggerValue, Version } from '../types';

/**
 * 获取当前版本
 */
export function getVersion(): Version {
    return process.env['mugen_version'] as Version;
}

/**
 * 获取 tsmugen.config.ts 的信息
 */
export function getMugenConfig(): MugenConfig {
    return require(`${process.cwd()}/tsmugen.config.js`);
}

/**
 * 创建 ts-mugen 配置信息
 * - character 人物默认配置信息
 * - output 输出目录
 * - entry 项目入口
 * - cacheName 快速启动时缓存的文件夹名
 * - programs 快速启动 mugen 对局配置
 * - programs[].name 别名
 * - programs[].version 主程序版本
 * - programs[].path 主程序绝对路径
 */
export function createMugenConfig(config: MugenConfig) {
    return config;
}

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
    function clear() {
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
        clear,
        toString
    };
}
