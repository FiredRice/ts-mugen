import { BaseValue } from '../types';
import { Name } from './names';
import { BasePerfix, BaseTrigger, createBaseFunTrigger } from './base';
import { ConstData } from './constant';
import { HitDefAttr, MoveType, StateType, TeamMode } from './model';

class BaseAttributes extends BasePerfix {
    constructor(perfix: string = '') {
        super(perfix);
    }

    // variable.ts
    public AILevel = new BaseTrigger(`${this.getPerfix()}AILevel`);
    public alive = new BaseTrigger(`${this.getPerfix()}Alive`);
    public backEdge = new BaseTrigger(`${this.getPerfix()}BackEdge`);
    public backEdgeBodyDist = new BaseTrigger(`${this.getPerfix()}BackEdgeBodyDist`);
    public backEdgeDist = new BaseTrigger(`${this.getPerfix()}BackEdgeDist`);
    public bottomEdge = new BaseTrigger(`${this.getPerfix()}BottomEdge`);
    public canRecover = new BaseTrigger(`${this.getPerfix()}CanRecover`);
    public ctrl = new BaseTrigger(`${this.getPerfix()}Ctrl`);
    public facing = new BaseTrigger(`${this.getPerfix()}facing`);
    public frontEdge = new BaseTrigger(`${this.getPerfix()}FrontEdge`);
    public frontEdgeBodyDist = new BaseTrigger(`${this.getPerfix()}FrontEdgeBodyDist`);
    public frontEdgeDist = new BaseTrigger(`${this.getPerfix()}FrontEdgeDist`);
    public getHitVar = new BaseTrigger(`${this.getPerfix()}GetHitVar`);
    public hitCount = new BaseTrigger(`${this.getPerfix()}HitCount`);
    public hitDefAttr = new HitDefAttr(this.getPerfix());
    public hitFall = new BaseTrigger(`${this.getPerfix()}HitFall`);
    public hitOver = new BaseTrigger(`${this.getPerfix()}HitOver`);
    public hitPauseTime = new BaseTrigger(`${this.getPerfix()}HitPauseTime`);
    public hitShakeOver = new BaseTrigger(`${this.getPerfix()}HitShakeOver`);
    public hitVelX = new BaseTrigger(`${this.getPerfix()}HitVel X`);
    public hitVelY = new BaseTrigger(`${this.getPerfix()}HitVel Y`);
    /**
     * 返回玩家的ID号
     */
    public ID = new BaseTrigger(`${this.getPerfix()}ID`);
    public inGuardDist = new BaseTrigger(`${this.getPerfix()}InGuardDist`);
    public IsHelper = createBaseFunTrigger(`${this.getPerfix()}IsHelper`);
    public isHomeTeam = new BaseTrigger(`${this.getPerfix()}IsHomeTeam`);
    public leftEdge = new BaseTrigger(`${this.getPerfix()}LeftEdge`);
    public life = new BaseTrigger(`${this.getPerfix()}Life`);
    public lifeMax = new BaseTrigger(`${this.getPerfix()}LifeMax`);
    public lose = new BaseTrigger(`${this.getPerfix()}Lose`);
    public loseKO = new BaseTrigger(`${this.getPerfix()}LoseKO`);
    public loseTime = new BaseTrigger(`${this.getPerfix()}LoseTime`);
    public matchNo = new BaseTrigger(`${this.getPerfix()}MatchNo`);
    public matchOver = new BaseTrigger(`${this.getPerfix()}MatchOver`);
    public moveContact = new BaseTrigger(`${this.getPerfix()}MoveContact`);
    public moveGuarded = new BaseTrigger(`${this.getPerfix()}MoveGuarded`);
    public moveHit = new BaseTrigger(`${this.getPerfix()}MoveHit`);
    public moveReversed = new BaseTrigger(`${this.getPerfix()}MoveReversed`);
    public moveType = new MoveType('MoveType', this.getPerfix());
    public NumHelper = createBaseFunTrigger(`${this.getPerfix()}NumHelper`);
    public NumExplod = createBaseFunTrigger(`${this.getPerfix()}NumExplod`);
    public NumTarget = createBaseFunTrigger(`${this.getPerfix()}NumTarget`);
    public NumEnemy = new BaseTrigger(`${this.getPerfix()}NumEnemy`);
    public NumPartner = new BaseTrigger(`${this.getPerfix()}NumPartner`);
    public NumProj = new BaseTrigger(`${this.getPerfix()}NumProj`);
    public NumProjID(id: BaseValue) {
        return new BaseTrigger(`${this.getPerfix()}NumProjID(${id})`);
    }
    public p2BodyDist = new BaseTrigger(`${this.getPerfix()}P2BodyDist`);
    public p2DistX = new BaseTrigger(`${this.getPerfix()}P2Dist X`);
    public p2DistY = new BaseTrigger(`${this.getPerfix()}P2Dist Y`);
    public p2Life = new BaseTrigger(`${this.getPerfix()}P2Life`);
    public p2MoveType  = new MoveType('P2MoveType', this.getPerfix());
    public p2StateNo = new BaseTrigger(`${this.getPerfix()}P2StateNo`);
    public p2StateType = new StateType('P2StateType', this.getPerfix());
    public palNo = new BaseTrigger(`${this.getPerfix()}PalNo`);
    public parentDistX = new BaseTrigger(`${this.getPerfix()}ParentDist X`);
    public parentDistY = new BaseTrigger(`${this.getPerfix()}ParentDist Y`);
    public posX = new BaseTrigger(`${this.getPerfix()}Pos X`);
    public posY = new BaseTrigger(`${this.getPerfix()}Pos Y`);
    public power = new BaseTrigger(`${this.getPerfix()}Power`);
    public powerMax = new BaseTrigger(`${this.getPerfix()}PowerMax`);
    public prevStateNo = new BaseTrigger(`${this.getPerfix()}PrevStateNo`);
    public ProjCancelTime(id: BaseValue) {
        return new BaseTrigger(`${this.getPerfix()}ProjCancelTime(${id})`);
    }
    public ProjContact(id?: BaseValue) {
        return new BaseTrigger(`${this.getPerfix()}ProjContact${id || ''}`);
    }
    public ProjContactTime(id: BaseValue) {
        return new BaseTrigger(`${this.getPerfix()}ProjContactTime(${id})`);
    }
    public ProjGuarded(id?: BaseValue) {
        return new BaseTrigger(`${this.getPerfix()}ProjGuarded${id || ''}`);
    }
    public ProjGuardedTime(id: BaseValue) {
        return new BaseTrigger(`${this.getPerfix()}ProjGuardedTime(${id})`);
    }
    public ProjHit(id?: BaseValue) {
        return new BaseTrigger(`${this.getPerfix()}ProjHit${id || ''}`);
    }
    public ProjHitTime(id: BaseValue) {
        return new BaseTrigger(`${this.getPerfix()}ProjHitTime(${id})`);
    }
    public rightEdge = new BaseTrigger(`${this.getPerfix()}RightEdge`);
    public rootDistX = new BaseTrigger(`${this.getPerfix()}RootDist X`);
    public rootDistY = new BaseTrigger(`${this.getPerfix()}RootDist Y`);
    public roundsExisted = new BaseTrigger(`${this.getPerfix()}RoundsExisted`);
    public stateNo = new BaseTrigger(`${this.getPerfix()}StateNo`);
    public stateType = new StateType('StateType', this.getPerfix());
    public teamMode = new TeamMode('TeamMode', this.getPerfix());
    public teamSide = new BaseTrigger(`${this.getPerfix()}TeamSide`);
    public time = new BaseTrigger(`${this.getPerfix()}Time`);
    public topEdge = new BaseTrigger(`${this.getPerfix()}TopEdge`);
    public uniqHitCount = new BaseTrigger(`${this.getPerfix()}UniqHitCount`);
    public velX = new BaseTrigger(`${this.getPerfix()}Vel X`);
    public velY = new BaseTrigger(`${this.getPerfix()}Vel Y`);
    public win = new BaseTrigger(`${this.getPerfix()}Win`);
    public winKO = new BaseTrigger(`${this.getPerfix()}WinKO`);
    public winTime = new BaseTrigger(`${this.getPerfix()}WinTime`);
    public winPerfect = new BaseTrigger(`${this.getPerfix()}WinPerfect`);


    // constant.ts
    public data = new ConstData(this.perfix);

    // names.ts
    public authorName = new Name('AuthorName', this.perfix);
    public name = new Name('Name', this.perfix);

    // anim.ts
    public anim  = new BaseTrigger(`${this.getPerfix()}Anim`);
    public animelem = new BaseTrigger(`${this.getPerfix()}AnimElem`);
    public animtime = new BaseTrigger(`${this.getPerfix()}AnimTime`);
    public AnimElemNo(id: BaseValue) {
        return new BaseTrigger(`${this.getPerfix()}AnimElemNo(${id})`);
    }
    public AnimElemTime(id: BaseValue) {
        return new BaseTrigger(`${this.getPerfix()}AnimElemTime(${id})`);
    }
    public AnimExist(id: BaseValue) {
        return new BaseTrigger(`${this.getPerfix()}AnimExist(${id})`);
    }
    public SelfAnimExist(id: BaseValue) {
        return new BaseTrigger(`${this.getPerfix()}SelfAnimExist(${id})`);
    }

    public var(index: number) {
        return new BaseTrigger(`${this.getPerfix()}var(${index})`);
    }
    public fvar(index: number) {
        return new BaseTrigger(`${this.getPerfix()}fvar(${index})`);
    }
    public sysFVar(index: number) {
        return new BaseTrigger(`${this.getPerfix()}SysFVar(${index})`);
    }
    public sysVar(index: number) {
        return new BaseTrigger(`${this.getPerfix()}SysVar(${index})`);
    }

}

export class Attributes extends BaseAttributes {
    public constructor(perfix: string = '') {
        super(perfix);
    }
    // attributes.ts
    public root = new BaseAttributes(`${this.getPerfix()}root`);
    public parent = new BaseAttributes(`${this.getPerfix()}parent`);
    public partner = new BaseAttributes(`${this.getPerfix()}partner`);
    public enemynear = new BaseAttributes(`${this.getPerfix()}enemynear`);
    public target = new BaseAttributes(`${this.getPerfix()}target`);
    public Helper(id: BaseValue) {
        return new BaseAttributes(`${this.getPerfix()}Helper(${id})`);
    }
    public EnemyNear(stateno: BaseValue) {
        return new BaseAttributes(`${this.getPerfix()}EnemyNear(${stateno})`);
    }
}

export const root = new Attributes('root');
export const parent = new Attributes('parent');
export const partner = new Attributes('partner');
export const enemynear = new Attributes('enemynear');
export function EnemyNear(stateno: BaseValue) {
    return new Attributes(`EnemyNear(${stateno})`);
}
export const target = new Attributes('target');
export function playerId(id: BaseValue) {
    return new Attributes(`playerId(${id})`);
}
