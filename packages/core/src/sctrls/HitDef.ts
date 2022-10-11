import { currentWrite } from '../core';
import { AttrValue, BasePostype, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';
import { AfterImageParams } from './AfterImage';

type AnimType = 'light' | 'medium' | 'hard' | 'back' | 'up' | 'diagup';
type P2AttackType = 'High' | 'Low' | 'Trip' | 'None';
type EnvshakeType = {
    time?: AttrValue;
    freq?: AttrValue;
    ampl?: AttrValue;
    phase?: AttrValue;
};

interface HitDefParams extends BaseSctrls {
    attr: string;
    hitflag?: string;
    guardflag?: string;
    affectteam?: 'B' | 'E' | 'F';
    animtype?: AnimType;
    priority?: [AttrValue, AttrValue];
    damage?: [AttrValue, AttrValue];
    pausetime?: [AttrValue, AttrValue];
    sparkno?: AttrValue;
    sparkxy?: [AttrValue, AttrValue];
    hitsound?: [AttrValue, AttrValue];
    guardsound?: [AttrValue, AttrValue];
    yaccel?: AttrValue;
    mindist?: [AttrValue, AttrValue];
    maxdist?: [AttrValue, AttrValue];
    snap?: [AttrValue, AttrValue];
    p1sprpriority?: AttrValue;
    p2sprpriority?: AttrValue;
    p1facing?: AttrValue;
    p1getp2facing?: AttrValue;
    p2facing?: AttrValue;
    p1stateno?: AttrValue;
    p2stateno?: AttrValue;
    p2getp1state?: AttrValue;
    forcestand?: AttrValue;
    forcenofall?: AttrValue;
    id?: AttrValue;
    chainID?: AttrValue;
    nochainID?: [AttrValue, AttrValue];
    hitonce?: AttrValue;
    kill?: AttrValue;
    numhits?: AttrValue;
    getpower?: [AttrValue, AttrValue];
    givepower?: [AttrValue, AttrValue];
    palfx?: {
        time?: AttrValue;
        mul?: [AttrValue, AttrValue, AttrValue];
        add?: [AttrValue, AttrValue, AttrValue];
    };
    envshake?: EnvshakeType;
    guard?: {
        sparkno?: AttrValue;
        pausetime?: [AttrValue, AttrValue];
        slidetime?: AttrValue;
        hittime?: AttrValue;
        ctrltime?: AttrValue;
        dist?: AttrValue;
        velocity: [AttrValue, AttrValue];
        cornerpush?: {
            veloff?: AttrValue;
        };
        kill?: AttrValue;
    };
    ground?: {
        type?: P2AttackType;
        slidetime?: AttrValue;
        hittime?: AttrValue;
        velocity: [AttrValue, AttrValue];
        cornerpush?: {
            veloff?: AttrValue;
        };
    };
    air?: {
        type?: P2AttackType;
        animtype?: AnimType;
        hittime?: AttrValue;
        velocity: [AttrValue, AttrValue];
        cornerpush?: {
            veloff?: AttrValue;
        };
        juggle?: AttrValue;
        fall?: AttrValue;
    };
    airguard?: {
        velocity: [AttrValue, AttrValue];
        cornerpush?: {
            veloff?: AttrValue;
        };
        ctrltime?: AttrValue;
    };
    down?: {
        velocity?: [AttrValue, AttrValue];
        cornerpush?: {
            veloff?: AttrValue;
        };
        hittime?: AttrValue;
        bounce?: AttrValue;
    };
    Fall?: AttrValue;
    fall?: {
        animtype?: AnimType;
        xvelocity?: AttrValue;
        yvelocity?: AttrValue;
        recover?: AttrValue;
        recovertime?: AttrValue;
        damage?: AttrValue;
        kill?: AttrValue;
        envshake?: EnvshakeType;
    };
}

/**
 * HitDef 
 * - 定义玩家攻击中的单个hit(属性).
 */
export function HitDef(params: HitDefParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = HitDef\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}

interface ProjectileParams extends HitDefParams {
    ProjID?: AttrValue;
    projanim?: AttrValue;
    projhitanim?: AttrValue;
    projremanim?: AttrValue;
    projcancelanim?: AttrValue;
    projscale?: [AttrValue, AttrValue];
    projremove?: AttrValue;
    projremovetime?: AttrValue;
    velocity?: [AttrValue, AttrValue];
    remvelocity?: [AttrValue, AttrValue];
    accel?: [AttrValue, AttrValue];
    velmul?: [AttrValue, AttrValue];
    projhits?: AttrValue;
    projmisstime?: AttrValue;
    projpriority?: AttrValue;
    projsprpriority?: AttrValue;
    projedgebound?: AttrValue;
    projstagebound?: AttrValue;
    projheightbound?: [AttrValue, AttrValue];
    offset?: [AttrValue, AttrValue];
    postype?: BasePostype;
    projshadow?: AttrValue | [AttrValue, AttrValue, AttrValue];
    supermovetime?: AttrValue;
    pausemovetime?: AttrValue;
    ownpal?: AttrValue;
    remappal?: [AttrValue, AttrValue];
    afterimage?: AfterImageParams;
}

/**
 * Projectile 
 * - 为玩家创建一个飞行道具.
 */
export function Projectile(params: ProjectileParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = Projectile\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}