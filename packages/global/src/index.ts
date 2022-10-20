import { Var, root, parent, partner, enemy, enemynear, target, Helper, FVar, sysVar, sysFVar, Attributes } from '@tsmugen/core';
import * as allTriggers from '@tsmugen/core/lib/cjs/triggers';
import './types';

Object.keys(allTriggers).forEach(function (key) {
    global[key] = allTriggers[key];
});

interface CustomVars {
    [x: string]: Var;
}
interface CustomFVars {
    [x: string]: FVar;
}
interface CustomSysVars {
    [x: string]: ReturnType<typeof sysVar>;
}
interface CustomSysFVars {
    [x: string]: ReturnType<typeof sysFVar>;
}

type CustomAnyVars = CustomVars | CustomFVars | CustomSysVars | CustomSysFVars;

function injectGlobalAnyVars(vars: CustomAnyVars, funKey: string) {
    Object.keys(vars).forEach(function (key) {
        root[key] = root[funKey](vars[key].getIndex());
        parent[key] = parent[funKey](vars[key].getIndex());
        partner[key] = partner[funKey](vars[key].getIndex());
        enemy[key] = enemy[funKey](vars[key].getIndex());
        enemynear[key] = enemynear[funKey](vars[key].getIndex());
        target[key] = target[funKey](vars[key].getIndex());
    });
    const _global: any = global;
    _global['root'] = root;
    _global['parent'] = parent;
    _global['partner'] = partner;
    _global['enemy'] = enemy;
    _global['enemynear'] = enemynear;
    _global['target'] = target;
}

/**
 * 向全局的 root、parent、partner、enemy、enemynear、target 中注入自定义整型变量
 */
export function injectGlobalVars(vars: CustomVars) {
    injectGlobalAnyVars(vars, 'var');
}

/**
 * 向全局的 root、parent、partner、enemy、enemynear、target 中注入自定义系统整型变量
 */
export function injectGlobalSysVars(vars: CustomSysVars) {
    injectGlobalAnyVars(vars, 'sysVar');
}

/**
 * 向全局的 root、parent、partner、enemy、enemynear、target 中注入自定义浮点型变量
 */
export function injectGlobalFVars(vars: CustomFVars) {
    injectGlobalAnyVars(vars, 'fvar');
}

/**
 * 向全局的 root、parent、partner、enemy、enemynear、target 中注入自定义系统浮点型变量
 */
export function injectGlobalSysFVars(vars: CustomSysFVars) {
    injectGlobalAnyVars(vars, 'sysFVar');
}


type PlayerReturnType<T, K> = T & K;

function injectPlayerAnyVars(player, vars: CustomAnyVars, funKey: string) {
    Object.keys(vars).forEach(function (key) {
        player[key] = player[funKey](vars[key].getIndex());
    });
    return player;
}

/**
 * 向某一全局实例注入整型变量
 * @param player 实例
 * @param vars 整型变量集合
 * @returns player 实例
 */
export function injectPlayerVars<T extends Attributes, K extends CustomVars>(player: T, vars: K): PlayerReturnType<T, K> {
    injectPlayerAnyVars(player, vars, 'var');
    return player as any;
}

/**
 * 向某一全局实例注入浮点型变量
 * @param player 实例
 * @param vars 浮点型变量集合
 * @returns player 实例
 */
export function injectPlayerFVars<T extends Attributes, K extends CustomFVars>(player: T, vars: K): PlayerReturnType<T, K> {
    injectPlayerAnyVars(player, vars, 'fvar');
    return player as any;
}

/**
 * 向某一全局实例注入系统整型变量
 * @param player 实例
 * @param vars 系统整型变量集合
 * @returns player 实例
 */
export function injectPlayerSysVars<T extends Attributes, K extends CustomSysVars>(player: T, vars: K): PlayerReturnType<T, K> {
    injectPlayerAnyVars(player, vars, 'sysVar');
    return player as any;
}

/**
 * 向某一全局实例注入系统浮点型变量
 * @param player 实例
 * @param vars 系统浮点型变量集合
 * @returns player 实例
 */
export function injectPlayerSysFVars<T extends Attributes, K extends CustomSysFVars>(player: T, vars: K): PlayerReturnType<T, K> {
    injectPlayerAnyVars(player, vars, 'sysFVar');
    return player as any;
}


interface CustomHelpers<T extends Helper> {
    [x: string]: T;
}

/**
 * 向全局的 root、parent、partner、enemy、enemynear、target 中注入自定义 helper
 */
export function injectGlobalHelpers<T extends Helper>(helpers: CustomHelpers<T>) {
    Object.keys(helpers).forEach(function (key) {
        const currentHelper = helpers[key];
        root[key] = root.Helper(currentHelper);
        parent[key] = parent.Helper(currentHelper);
        partner[key] = partner.Helper(currentHelper);
        enemy[key] = enemy.Helper(currentHelper);
        enemynear[key] = enemynear.Helper(currentHelper);
        target[key] = target.Helper(currentHelper);
    });
    const _global: any = global;
    _global['root'] = root;
    _global['parent'] = parent;
    _global['partner'] = partner;
    _global['enemy'] = enemy;
    _global['enemynear'] = enemynear;
    _global['target'] = target;
}


/**
 * 向某一实例注入自定义 helper
 * @param player 实例
 * @param helpers 自定义 helper 集合
 * @returns player 实例
 */
export function injectPlayerHelper<T extends Attributes, K extends Helper>(player: T, helpers: CustomHelpers<K>): PlayerReturnType<T, CustomHelpers<K>> {
    Object.keys(helpers).forEach(function (key) {
        player[key] = player.Helper(helpers[key]);
    });
    return player as any;
}