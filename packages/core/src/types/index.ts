import { BaseValue, Version } from '@tsmugen/utils';
import { Triggers } from '../core';
import { BaseTrigger } from '../triggers/base';

export * from './file';

export { MugenConfig, BaseValue, Version } from '@tsmugen/utils';

export type AttrValue = BaseValue | BaseTrigger | {
    value: BaseValue;
    _setInnerName: (name: BaseValue) => void;
    [x: string]: any;
};

export type StateType = 'S' | 'C' | 'A' | 'L' | 'U';
export type MoveType = 'A' | 'I' | 'H' | 'U';

export interface CharInfo {
    name: string;
    displayname?: string;
    versiondate: string;
    version: Version;
    author: string;
    localcoord: [BaseValue, BaseValue];
    palDefaults?: BaseValue[];
}

export interface CharFiles {
    cmd: string;
    cns: string;
    st: string;
    stcommon: string;
    sprite: string;
    anim: string;
    sound: string;
    [x: string]: string;
}

export type MBoolean = 0 | 1;

export type TriggersType = Triggers | AttrValue;

export interface BaseSctrls {
    triggers: TriggersType;
    describe?: string;
    version?: Version;
    ignorehitpause?: AttrValue;
    persistent?: AttrValue;
}

export type BasePostype = 'p1' | 'p2' | 'front' | 'back' | 'left' | 'right';
export type TransType = 'none' | 'add' | 'add1' | 'sub' | 'addalpha' | 'default';