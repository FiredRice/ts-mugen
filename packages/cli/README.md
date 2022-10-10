# @tsmugen/cli 使用文档

## 目录
- [介绍](#介绍)<br>
- [安装](#安装)<br>
- [使用方法](#使用方法)<br>

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