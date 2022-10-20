# @tsmugen/core 使用文档

## 目录
- [介绍](#介绍)<br>
- [安装](#安装)<br>
- [使用方法](#使用方法)<br>
- [API](#API)<br>
  - [Statedef](#State)<br> 
  - [Helper](#Helper)<br> 
  - [Var 与 FVar](#Var)<br> 
  - [Triggers](#Triggers)<br> 
  - [原生代码注入](#原生代码注入)<br> 
    - [在 state.appendControllers 的函数中随控制器一同注入](#ControllerInject)<br> 
    - [随 states 一同注入](#StatesInject)<br> 
    - [注入 API](#InjectAPIS)<br> 
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

### <div id='State'>Statedef</div>
`state` 通过钩子函数 `useStatedef` 在函数内声名。
**注意：若您在一个函数多次调用 `useStatedef`，则后面的声名会覆盖前面的声名。**
```ts
import { useStatedef, Null, time } from '@tsmugen/core';

function Start() {
    useStatedef({
        // id 为状态号真实值
        id: 1000,
        describe: 'Hello World!',
        type: 'S',
        movetype: 'I',
        physics: 'S',
        anim: 0
    });

    Null({ triggers: time.equal(0) });
}
```

`useStatedef` 中可以传入 `version` 属性。当传入 `version` 属性时，当且仅当构建时的版本号与 `version` 一致时，该 `State` 才会参与构建。

例如：
```ts
import { useStatedef, Null, time } from '@tsmugen/core';

function Start() {
    useStatedef({
        id: 1000,
        version: '1.1',
        describe: 'Hello World!',
        type: 'S',
        movetype: 'I',
        physics: 'S',
        anim: 0
    });

    Null({ triggers: time.equal(0) });
}
```
上述 `State` 输出的代码仅会出现在 1.1 版本的人物包中。
通过该属性可轻松对 `State` 进行版本控制。

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
|append|追加【与】关系触发器，同一方法中所有条件均为与运算|(...triggers: AttrValue[]) => this|
|add|追加指定索引触发器，同一方法中所有条件均为与运算|(index: number, ...triggers: AttrValue[]) => this|
|appendAll|追加 `TriggerAll` 触发器|(...triggers: AttrValue[]) => this|
#### Triggers 的钩子函数
|名称|说明|类型|
|---|---|---|
|useTriggers|创建一个 `triggers` 实例，仅为对 `new Triggers()` 的一层封装。|() => Triggers|
|createTriggers|牺牲灵活性使编码更加接近**原生编码风格的** `triggers` 实例化函数。|(params: [CreateTriggersParams](#CreateTriggersParams)) => Triggers|

### 原生代码注入
或许你会因为习惯了原生代码的编写方式而对这种编写方式感到厌烦。
不用担心，我为你准备了原生代码注入的功能。
注入方式有两种：
- 在 state.appendControllers 的函数中随控制器一同注入（主要用于追加原生代码编写的控制器）。
- 随 states 一同注入（主要用于追加原生代码编写的大量 `state`）。

#### <div id='ControllerInject'>在 state.appendControllers 的函数中随控制器一同注入</div>
```
; 同目录下的 native.cns 文件
[State 1300, 原生注入测试]
type = Null
trigger1 = 1
```
```ts
import { State, Null, time, readFile, NativeCode } from '@tsmugen/core';
import path from 'path';

// 读取原生代码
const code = readFile(path.join(__dirname, './native.cns'));

const state = new State({ id: 1000 })；

state.appendControllers(function () {
    Null({ triggers: time.equal(0) });

    // 注入原生代码
    NativeCode(code);
});

```
#### <div id='StatesInject'>随 states 一同注入</div>
```
; 同目录下的 native.cns 文件
[State 1300, 原生注入测试]
type = Null
trigger1 = 1
```
```ts
import { State, Null, time, readFile, Character, Mugen, NativeStates } from '@tsmugen/core';
import path from 'path';

const letsStart = new State({ id: 1000 });

letsStart.appendControllers(function () {
    Null({ triggers: time.equal(0) });
});

const character = new Character();

// 读取原生代码
const code = readFile(path.join(__dirname, './native.cns'));

character.injectStates([
    letsStart,
    // 在此处随 state 一同注入
    NativeStates(code)
]);

const mugen = new Mugen();
mugen.injectCharacter(character);
mugen.build();
```
#### <div id='InjectAPIS'>注入 API</div>
`NativeCode` 与 `NativeStates` 的第二个can顺均为可选属性 `version`，用于区分原生代码参与构建的人物包版本。
**若未传 `version` 则原生代码会参与所有版本的构建。**

|名称|说明|类型|
|---|---|---|
|NativeCode|在 `state.appendControllers` 中使用的注入函数|(code: string, version?: '1.0' \| '1.1') => void|
|NativeStates|随 `state` 一同注入的助手函数|(code: string, version?: '1.0' \| '1.1') => void|

### 其它
除以上特殊类以外，
- 所有控制器均为函数，且与官方文档命名保持一致。
- 所有控制器均有额外可选属性 `describe`，用于在构建的代码中为控制器附加注释。
- 所有控制器均有额外可选属性 `version`，用于区分控制器参与构建的人物包版本。（若未传 `version` 则控制器会参与所有版本的构建）
- 所有全局变量均为对象，且与官方文档命名保持一致。

**其余具体参数请参阅 MUGEN 官方文档。**

## <div id='Interface'>Interface</div>

**<div id='CallbackFun'>CallbackFun</div>**
```ts
type CallbackFun = (stateInfo: Statedef) => void;
```

**<div id='BaseValue'>BaseValue</div>**
```ts
type BaseValue = string | number;
```

**<div id='CreateTriggersParams'>CreateTriggersParams</div>**
```
interface CreateTriggersParams {
    All?: AttrValue;
    [x: number]: AttrValue;
}
```