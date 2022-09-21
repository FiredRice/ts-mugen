import { BaseValue, Version } from '@tsmugen/utils';
import { createTriggers } from '../core';
import { BaseTrigger } from '../triggers';

export { MugenConfig, BaseValue, Version } from '@tsmugen/utils';

export type TriggerValue = BaseValue | BaseTrigger | {
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

export type Triggers = ReturnType<typeof createTriggers> | TriggerValue;

export interface BaseSctrls {
    triggers: Triggers;
    describe?: string;
    ignorehitpause?: number;
    supermovetime?: number;
    pausemovetime?: number;
}

export type BasePostype = 'p1' | 'p2' | 'front' | 'back' | 'left' | 'right';