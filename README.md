# ts-mugen 使用文档

## 目录
- [介绍](#介绍)<br>
- [特性](#特性)<br>
- [适用人群](#适用人群)<br>
- [各包说明](#各包说明)<br>
- [安装](#安装)<br>

## 介绍
ts-mugen 是一款可以让您使用 `typescript` 开发 `mugen` 人物的框架。

## 特性
- 全局 `state`、`helper`、变量语义化和共享。
- 自动构建 1.0 与 1.1 版本人物包，便于双版本兼容开发。
- 函数式调用，减少非必要的 `helper` 数量。
- more...

## 适用人群
首先您可能根本不需要 `ts-mugen`。

若您想使用 `ts-mugen` 进行开发，**需满足以下条件**：

- **能熟练使用原生 `mugen` 语言开发人物包。**
- **拥有 `javascript` 或 `typescript` 开发经验。**

若您以下条件满足越多，则您使用 `ts-mugen` 开发的体验将越好。

- 原生的变量与 `helper` 使用让您感到困扰。
- 需要用函数封装公共代码而非用 `helper` 封装代码。
- 想更方便地同时开发 1.0 与 1.1 的人物包。

## 各包说明
为了持续扩展，`ts-mugen` 拆分为多个包，包之间相互解构，并提供从创建项目到构建到编码的一套相对完整的生态，由以下包构成：

|包名|说明|
|---|---|
|<a href="./packages/cli">@tsmugen/cli</a>|对人物进行打包与调试的脚手架|
|<a href="./packages/core">@tsmugen/core</a>|核心包|
|<a href="./packages/create-tsmugen-app">@tsmugen/create-tsmugen-app</a>|快速创建项目的脚手架，您可能并不需要这个|
|<a href="./packages/utils">@tsmugen/utils</a>|`@tsmugen/cli` 与 `@tsmugen/core`依赖的工具库|

## 安装

npm：
```sh
npm install @tsmugen/cli @tsmugen/core
```
yarn：
```sh
yarn add @tsmugen/cli @tsmugen/core
```