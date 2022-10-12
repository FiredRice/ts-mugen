# @tsmugen/utils 使用文档

## 目录
- [介绍](#介绍)<br>
- [API](#API)<br>
- [Interface](#Interface)<br>

## 介绍
`@tsmugen/utils` 为 `@tsmugen/cli` 与 `@tsmugen/core` 依赖的工具包。

## <div id='API'>API</div>
|名称|说明|类型|
|---|---|---|
|createMugenConfig|创建 tsmugen.config.js 中全局配置项的助手函数|(config: [MugenConfig](#MugenConfig)) => [MugenConfig](#MugenConfig)|
|getMugenConfig|获取 tsmugen.config.js 文件中的配置信息|() => [MugenConfig](#MugenConfig)|
|getVersion|获取当前构建中的人物包版本。|() => '1.0' \| '1.1'|

## <div id='Interface'>Interface</div>
**<div id='MugenConfig'>MugenConfig</div>**
```ts
type MugenConfig = {
    // 人物信息
    character: {
        name: string;
        displayname?: string;
        author: string;
        localcoord: [BaseValue, BaseValue];
        palDefaults?: BaseValue[];
    };
    // 监听目录
    rootDir: string;
    // 输出目录
    output: string;
    // 项目入口
    entry: string;
    // 快速启动时缓存的文件夹名
    cacheName?: string;
    // 是否构建变量表
    buildVariableTable?: boolean;
    // 监听配置项
    watchOptions?: WatchOptions;
    // 主程序配置
    programs?: {
        // 主程序别名
        name: string;
        // 主程序版本
        version: '1.0' | '1.1';
        // 主程序绝对路径
        path: string;
    }[];
};
```