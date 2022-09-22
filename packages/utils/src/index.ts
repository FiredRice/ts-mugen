export type BaseValue = string | number;

export type Version = '1.0' | '1.1';

export interface MugenConfig {
    character: {
        name: string;
        displayname?: string;
        author: string;
        localcoord: [BaseValue, BaseValue];
        palDefaults?: BaseValue[];
    };
    output: string;
    entry: string;
    cacheName?: string;
    buildVariableTable?: boolean;
    programs?: {
        name: string;
        version: Version;
        path: string;
    }[];
}

/**
 * 创建 ts-mugen 配置信息
 * - character 人物默认配置信息
 * - output 输出目录
 * - entry 项目入口
 * - cacheName 快速启动时缓存的文件夹名
 * - buildVariableTable 构建变量表
 * - programs 快速启动 mugen 对局配置
 * - programs[].name 别名
 * - programs[].version 主程序版本
 * - programs[].path 主程序绝对路径
 */
export function createMugenConfig(config: MugenConfig) {
    return config;
}

/**
 * 获取 tsmugen.config.js 配置信息
 */
export function getMugenConfig(): MugenConfig {
    let config: any = {};
    try {
        config = require(`${process.cwd()}/tsmugen.config.js`);
    } catch (error) {
        config = {};
    }
    return config;
}

/**
 * 获取当前版本
 */
export function getVersion(): Version {
    try {
        return process.env['mugen_version'] as Version || '1.0';
    } catch (error) {
        return '1.0';
    }
}