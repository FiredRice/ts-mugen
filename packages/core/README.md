# @tsmugen/core 使用文档

## 目录
- [介绍](#介绍)<br>
- [安装](#安装)<br>
- [使用方法](#使用方法)<br>
- [API](#API)<br>
  - [State](#State)<br> 
  - [Helper](#Helper)<br> 
  - [Var 与 FVar](#Var)<br> 
  - [Triggers](#Triggers)<br> 
  - [其它](#其它)<br> 
- [Interface](#Interface)<br>

## 介绍
`@tsmugen/core` 为 `ts-mugen` 框架的核心包，也是您必须要安装的包。

## 安装

npm：
```sh
npm install @tsmugen/core
```
yarn：
```sh
yarn add @tsmugen/core
```

## 使用方法
```ts
// 实例化 State
const letsStart = new State({
    id: 1000,
    describe: 'Hello World!',
    type: 'S',
    movetype: 'I',
    physics: 'S',
    anim: 0
});

// 为 State 追加控制器
letsStart.appendControllers(function () {
    Null({ triggers: time.equal(0) });
});

// 实例化人物
const character = new Character();

// 人物注入 State
character.injectStates([letsStart]);

// 实例化 mugen 引擎
const mugen = new Mugen();

// mugen 引擎注入人物
mugen.injectCharacter(character);

// 开始构建人物包
mugen.build();
```
**注意：需将所有实例化的 `State` 合并到同一个数组中，不在该数组中存在的 `State` 不参与构建。**

构建后输出到 bundle.cns 文件中的内容为：
```
; Hello World!
[Statedef 1000]
type = S
movetype = I
physics = S
anim = 0

[State 1000, ]
type = Null
trigger1 = time = 0
```

## <div id='API'>API</div>

### <div id='State'>State</div>

```ts
import { State, Null, time } from '@tsmugen/core';

const state = new State({
    id: 1000,
    describe: 'Hello World!',
    type: 'S',
    movetype: 'I',
    physics: 'S',
    anim: 0
})；

state.appendControllers(function () {
    Null({ triggers: time.equal(0) });
});
```
通过实例化 `State` 创建一个 state，并可以通过**多次**调用 `appendControllers` 方法追加控制器。

#### State 属性
|名称|说明|类型|
|---|---|---|
|id|状态号真实值|[BaseValue](#BaseValue)|
|appendControllers|追加控制器，可传入多个函数|(...callbacks: [CallbackFun](#CallbackFun)[]) => this|

### <div id='Helper'>Helper</div>

```ts
const helper = new Helper(1300);
// 输出 helper(1300), animelem = 0
helper.animelem.equal(0);
```
通过实例化 `Helper` 声名一个 helper，helper对象内置了所有 MUGEN 全局变量。

#### Helper 属性
|名称|说明|类型|
|---|---|---|
|id|helper 的 `id`|[BaseValue](#BaseValue)|
|Create|创建一个 helper，params 为除 `id` 以外的所有参数集合（您已在实例化时声名了 id，因此无需再次传入）|(params) => void|

### <div id='Var'>Var 与 FVar</div>
`ts-mugen` 内置了四中变量类：`Var`、`FVar`、`HelperVar` 与 `HelperFVar`。

其中 `HelperVar` 与 `HelperFVar` 为自定义 helper 中使用的变量。
```ts
class SuperHelper extends Helper {
    public jiasudu: HelperVar;
    constructor(id: AttrValue) {
        super(id);
        /**
         * @param id helper 的 id
         * @param index 变量索引
         * /
        this.jiasudu = new HelperVar(id, 1);
    }
}
```
如上您可以通过继承 `Helper` 类来自定义您自己的 `Helper` 类，而 `HelperVar` 与 `HelperFVar` 便是在这里方便您对变量进行语义化调用的 API。
`HelperVar` 与 `HelperFVar` 也仅应用于该场景。

#### 所有变量属性
|名称|说明|类型|
|---|---|---|
|getIndex|获取变量索引|() => AttrValue|
|Set|设置玩家(起作用的)变量(var/fvar)数值|(params) => void|
|Add|增加玩家一个(起作用的)变量(var/fvar)数值|(params) => void|
|Random|设定指定整型变量为随机数（该方法仅在 `Var` 与 `HelperVar` 中存在）|(params) => void|

```ts
/**
 * @param index 变量索引
 * @param describe 变量描述
 * /
const AISwitch = new Var(59, 'AI 开关');
```
实例化 `Var` 与 `FVar` 时需要两个参数，必选参数 `index` （变量索引）与可选参数 `describe` （变量描述）。
若有 `describe` 属性，且在 tsmugen.config.js 文件中配置了 `buildVariableTable: true`，则该变量会在构建人物时输出到变量表中。

### <div id='Triggers'>Triggers</div>
控制器的触发器。
```ts
const triggers = new Triggers();
triggers.appendAnd(time.over(0), time.less(10));
triggers.appendAnd(animelem.equal(5).over(0));

Null({ triggers });
/**
 * 输出以下内容
 * [State 1000, ]
 * type = Null
 * trigger1 = time > 0
 * trigger1 = time < 10
 * trigger2 = animelem = 5, > 0
 * /
```
#### Triggers 属性
|名称|说明|类型|
|---|---|---|
|clear|清空 triggers 内容，便于公用同一变量|() => void|
|appendAll|追加【与】关系触发器，同一方法中所有条件均为与运算|(...triggers: AttrValue[]) => this|
|appendOr|追加【或】关系触发器，同一方法中所有条件均为或运算（每增加一个条件，触发器索引便自增 1，请格外注意）|(...triggers: AttrValue[]) => this|
|appendAll|追加【与】关系的 `TriggerAll`|(...triggers: AttrValue[]) => this|

### 其它
除以上特殊类以外，
- 所有控制器均为函数，且与官方文档命名保持一致。
- 所有控制器均有额外属性 `describe`，用于在构建的代码中为控制器附加注释
- 所有全局变量均为对象，且与官方文档命名保持一致。

**具体参数请参阅 MUGEN 官方文档。**

## <div id='Interface'>Interface</div>

**<div id='CallbackFun'>CallbackFun</div>**
```ts
type CallbackFun = (stateInfo: Statedef) => void;
```

**<div id='BaseValue'>BaseValue</div>**
```ts
type BaseValue = string | number;
```
