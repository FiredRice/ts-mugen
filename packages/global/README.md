# @tsmugen/global 使用文档

## 目录
- [介绍](#介绍)<br>
- [使用方法](#使用方法)<br>
- [API](#API)<br>

## 介绍
`@tsmugen/global` 可将 `@tsmugen/core` 中的所有 `triggers` 注册到全局。因此若您想在自己的项目中集成 `ts-mugen`，请不要安装该插件。

## 使用方法
由于 `parent` 与 `name` 属性与 `typescript` 自带的 `lib.dom.d.ts` 中的声名冲突，因此需在项目的 tsconfig.json 文件中追加如下配置：
```ts
// tsconfig.json
{
    "compilerOptions": {
        // ...其余配置
    },
    "exclude": [
        // 追加排除
        "node_modules/typescript/lib/lib.dom.d.ts"
    ],
    // ...其余配置
}
```
然后在项目入口顶部直接引入即可。
```ts
// 项目入口文件
import '@tsmugen/global';

import { Character, Mugen } from '@tsmugen/core';
import states from './skills';

const char = new Character();

char.injectStates(states);

const mugen = new Mugen();

mugen.injectCharacter(char);

mugen.build();
```
此后对人物的编写无需再单独引入 `triggers`。
```ts
import { Null, useStatedef } from '@tsmugen/core';

function start() {
    useStatedef({
        id: 1000,
        anim: 2000
    });

    Null({
        // 此处不必再引入 time
        triggers: time.equal(0)
    });
}
```

## <div id="API">API</div>
|名称|说明|类型|
|---|---|---|
|injectGlobalVars|向全局的 root、parent、partner、enemy、enemynear、target 中注入自定义整型变量|(vars) => void|
|injectGlobalFVars|向全局的 root、parent、partner、enemy、enemynear、target 中注入自定义浮点型变量|(fvars) => void|
|injectGlobalSysVars|向全局的 root、parent、partner、enemy、enemynear、target 中注入自定义系统整型变量|(sysVars) => void|
|injectGlobalSysFVars|向全局的 root、parent、partner、enemy、enemynear、target 中注入自定义系统浮点型变量|(sysFVars) => void|
|injectGlobalHelpers|向全局的 root、parent、partner、enemy、enemynear、target 中注入自定义 helper|(helpers) => void|
|injectPlayerVars|向某一全局实例注入自定义整型变量|(player, vars) => void|
|injectPlayerFVars|向某一全局实例注入自定义浮点型变量|(player, fvars) => void|
|injectPlayerSysVars|向某一全局实例注入自定义系统整型变量|(player, sysVars) => void|
|injectPlayerSysFVars|向某一全局实例注入自定义系统浮点型变量|(player, sysFVars) => void|
|injectPlayerHelper|向某一全局实例注入自定义 helper|(player, helpers) => void|

在调用任意 `injectGlobalXXX` API 后，实例已成功注入，但却无法自动映射语法提示，需手动创建全局声名扩展。
在项目任意位置添加 *.d.ts 文件。
```ts
// src/types/index.d.ts

declare global {
    interface Root extends GlobalExtend { }
    interface Parent extends GlobalExtend { }
    interface Partner extends GlobalExtend { }
    interface Enemynear extends GlobalExtend { }
    interface Enemy extends GlobalExtend { }
    interface Target extends GlobalExtend { }
    interface PlayerId extends GlobalExtend { }
}
```
其中 `GlobalExtend` 为你的自定义变量、`helper` 类型集合。
例如：
```ts
// 全局 helper
export const testHelper = new Helper(3000);

export const customHelpers = {
    testHelper
};

export type CustomHelpers = typeof customHelpers;

// 全局变量
export const AISwitch = new Var(59, 'AI 开关');

export const customVars = {
    AISwitch
};

export type CustomVars = typeof customVars;

export type GlobalExtend = CustomVars & CustomHelpers;

```
- `customHelpers` 为自定义 helper 集合
- `customVars` 为自定义整型变量集合

每次新增（变量/helper）便可向 （`customVars`/`customHelpers`）中追加属性，`typescript` 便可自动推导类型。


**注意：**
- **以上任意 API 注入的（变量/helper）均会丢失控制器方法，虽然依然存在语法提示（因为不需要）。**
- **使用以上任意注入 helper 的 API 时，请注意 helper 的 id 应为明确的值而非表达式，即 `new Helper(ID.add(1000))` 等形式的 helper 需避免。**