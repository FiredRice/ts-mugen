import { currentWrite } from '../core';
import { Version } from '../types';
import { versionCheck } from '../utils';

/**
 * 原生代码
 * - 应用于 state.appendControllers 中
 * @param code 
 * @param version 匹配版本号
 */
export default function NativeCode(code: string, version?: Version) {
    versionCheck(function () {
        try {
            currentWrite.append(`${code}\n`);
        } catch (error) {
            console.log(error);
        }
    }, version);
}