# @tsmugen/cli 使用文档

## 目录
- [介绍](#介绍)<br>
- [安装](#安装)<br>
- [使用方法](#使用方法)<br>
- [构建流程](#构建流程)<br>

## 介绍
`@tsmugen/cli` 为 `ts-mugen` 框架的脚手架，用于帮助您对人物进行打包与调试。

## 安装
npm
```sh
npm install @tsmugen/cli
```
yarn
```sh
yarn add @tsmugen/cli
```

## 使用方法
项目根目录下创建 tsmugen.config.js 文件。
```js
// tsmugen.config.js
const { createMugenConfig } = require('@tsmugen/utils');

module.exports = createMugenConfig({
    character: {
        name: 'demo',
        displayname: '',
        author: '',
        localcoord: [320, 240],
    },
    output: 'lib',
    entry: 'src/index.ts',
    buildVariableTable: true,
    programs: [],
});
```
确保项目根目录下存在 public/index.def 文件。
```
; 人物信息
%INFO%
; 人物文件
[Files]
cmd = static/command.cmd                ; 操作输入
cns = cns/config.cns                    ; 常量定义
%STATES%
stcommon = cns/common1.cns              ; 公用 state (人物文件夹或者common文件夹中)
sprite = static/sprite_%VERSION%.sff    ; 图像文件
anim = static/anim.air                  ; 动作文件
sound = static/sound.snd                ; 声效文件

; 将选人时的按键对应到色表上
[Palette Keymap]
x = 1 ; 按X按键选色表1，以此类推
y = 2
z = 3
a = 4
b = 5
c = 6
;x2 = 7 ; 按start和X按键选色表7，以此类推
;y2 = 8
;z2 = 9
;a2 = 10
;b2 = 11

; arcade模式的开头结局动画
[Arcade]
; intro.storyboard = intro.def
; ending.storyboard = ending.def
```
public 文件夹内存放必要的人物包文件（.cmd、.sff、.air、.snd、.cns等）

**可在命令行执行以下指令：**

```sh
tsmugen build [version]
```
构建指定版本的人物包，`version` 可选值为 1.0、1.1。若未指定版本，则构建全部版本的人物。

```sh
tsmugen start
```
启动 MUGEN 主程序，需要您预先构建好人物包，并在项目根目录下的 tsmugen.config.js 文件中配置 `programs` 属性（主程序信息）。
若 `programs` 属性仅有一个主程序，则直接运行该主程序。若存在多个主程序，则需您手动选择需要执行的主程序。

```sh
tsmugen clean
```
清除调试时因异常退出导致的主程序中残留的缓存。

## 构建流程
- 读取 tsmugen.config.js 文件内的配置信息，以 `entry` 为项目入口开始执行 `ts-mugen` 引擎。
- 读取 public/index.def 文件。
  - 将 tsmugen.config.js 中配置的 `character` 信息替换 `%INFO%`。
  - 将当前构建的人物包版本号替换 `%VERSION%`。
  - 将 `%STATES%` 替换为 `st = cns/bundle.cns`。
  - 在 `output` 目录下创建新的 [version]/[name]/[name].def 文件。（即人物包入口文件）
- 将 public 文件夹下除 .def 以外的所有文件复制到 `output` 目录下 [version]/[name] 中。
- 将构建好的代码输出到 `output` 目录下 [version]/[name]/cns/bundle.cns 中。
  - 其中若构建 1.0 版本人物包，则路径中包含 1.1 的文件不会参与复制。
  - 其中若构建 1.1 版本人物包，则路径中包含 1.0 的文件不会参与复制。
- 构建结束。