# @tsmugen/global 使用文档

## 目录
- [介绍](#介绍)<br>
- [使用方法](#使用方法)<br>
- [注意](#注意)<br>

## 介绍
`@tsmugen/global` 可将 `@tsmugen/core` 中的所有 `triggers` 注册到全局。因此若您想在自己的项目中集成 `ts-mugen`，请不要安装该插件。

## 使用方法
在项目入口顶部直接引入即可。
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
import { Null, createState } from '@tsmugen/core';

function start() {
    createState({
        id: 1000,
        anim: 2000
    });

    Null({
        // 此处不必再引入 time
        triggers: time.equal(0)
    });
}
```

## 注意
由于 `typescript` 已在全局声名了 `name` 与 `parent`，因此全局中无法直接使用这两个变量。
**`name` 与 `parent` 依然需要单独引入。**
```ts
// parent 与 name  需单独引入
import { Null, createState, parent, name } from '@tsmugen/core';

function start() {
    createState({
        id: 1000,
        anim: 2000
    });

    Null({
        triggers: parent.time.equal(0)
    });

    Null({
        triggers: name.equal('破晓雪风')
    });
}
```