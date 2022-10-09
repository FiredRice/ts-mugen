import { AttrValue, BaseValue } from '../types';
import { Name } from './names';
import { BasePerfix, BaseTrigger, createBaseFunTrigger } from './base';
import { ConstData, ConstMovement, ConstSize, ConstVelocity } from './constant';
import { HitDefAttr, MoveType, StateType, TeamMode } from './model';
import { transAttrValue } from '../utils';

export class BaseAttributes extends BasePerfix {
    constructor(perfix: string = '') {
        super(perfix);
    }

    // variable.ts
    public readonly AILevel = new BaseTrigger(`${this.getPerfix()}AILevel`);
    public readonly alive = new BaseTrigger(`${this.getPerfix()}Alive`);
    public readonly backEdge = new BaseTrigger(`${this.getPerfix()}BackEdge`);
    public readonly backEdgeBodyDist = new BaseTrigger(`${this.getPerfix()}BackEdgeBodyDist`);
    public readonly backEdgeDist = new BaseTrigger(`${this.getPerfix()}BackEdgeDist`);
    public readonly bottomEdge = new BaseTrigger(`${this.getPerfix()}BottomEdge`);
    public readonly cameraPosX = new BaseTrigger(`${this.getPerfix()}CameraPos X`);
    public readonly cameraPosY = new BaseTrigger(`${this.getPerfix()}CameraPos Y`);
    public readonly cameraZoom = new BaseTrigger(`${this.getPerfix()}CameraZoom`);
    public readonly canRecover = new BaseTrigger(`${this.getPerfix()}CanRecover`);
    public readonly ctrl = new BaseTrigger(`${this.getPerfix()}Ctrl`);
    public readonly drawGame = new BaseTrigger(`${this.getPerfix()}DrawGame`);
    public readonly facing = new BaseTrigger(`${this.getPerfix()}facing`);
    public readonly frontEdge = new BaseTrigger(`${this.getPerfix()}FrontEdge`);
    public readonly frontEdgeBodyDist = new BaseTrigger(`${this.getPerfix()}FrontEdgeBodyDist`);
    public readonly frontEdgeDist = new BaseTrigger(`${this.getPerfix()}FrontEdgeDist`);
    public readonly gameHeight = new BaseTrigger(`${this.getPerfix()}GameHeight`);
    public readonly gameTime = new BaseTrigger(`${this.getPerfix()}GameTime`);
    public readonly gameWidth = new BaseTrigger(`${this.getPerfix()}GameWidth`);
    public readonly getHitVar = new BaseTrigger(`${this.getPerfix()}GetHitVar`);
    public readonly hitCount = new BaseTrigger(`${this.getPerfix()}HitCount`);
    public readonly hitDefAttr = new HitDefAttr(`${this.getPerfix()}HitDefAttr`);
    public readonly hitFall = new BaseTrigger(`${this.getPerfix()}HitFall`);
    public readonly hitOver = new BaseTrigger(`${this.getPerfix()}HitOver`);
    public readonly hitPauseTime = new BaseTrigger(`${this.getPerfix()}HitPauseTime`);
    public readonly hitShakeOver = new BaseTrigger(`${this.getPerfix()}HitShakeOver`);
    public readonly hitVelX = new BaseTrigger(`${this.getPerfix()}HitVel X`);
    public readonly hitVelY = new BaseTrigger(`${this.getPerfix()}HitVel Y`);
    /**
     * 返回玩家的ID号
     */
    public readonly ID = new BaseTrigger(`${this.getPerfix()}ID`);
    public readonly inGuardDist = new BaseTrigger(`${this.getPerfix()}InGuardDist`);
    public readonly isHelper = createBaseFunTrigger(`${this.getPerfix()}IsHelper`);
    public readonly isHomeTeam = new BaseTrigger(`${this.getPerfix()}IsHomeTeam`);
    public readonly leftEdge = new BaseTrigger(`${this.getPerfix()}LeftEdge`);
    public readonly life = new BaseTrigger(`${this.getPerfix()}Life`);
    public readonly lifeMax = new BaseTrigger(`${this.getPerfix()}LifeMax`);
    public readonly lose = new BaseTrigger(`${this.getPerfix()}Lose`);
    public readonly loseKO = new BaseTrigger(`${this.getPerfix()}LoseKO`);
    public readonly loseTime = new BaseTrigger(`${this.getPerfix()}LoseTime`);
    public readonly matchNo = new BaseTrigger(`${this.getPerfix()}MatchNo`);
    public readonly matchOver = new BaseTrigger(`${this.getPerfix()}MatchOver`);
    public readonly moveContact = new BaseTrigger(`${this.getPerfix()}MoveContact`);
    public readonly moveGuarded = new BaseTrigger(`${this.getPerfix()}MoveGuarded`);
    public readonly moveHit = new BaseTrigger(`${this.getPerfix()}MoveHit`);
    public readonly moveReversed = new BaseTrigger(`${this.getPerfix()}MoveReversed`);
    public readonly moveType = new MoveType('MoveType', this.getPerfix());
    public readonly numHelper = createBaseFunTrigger(`${this.getPerfix()}NumHelper`);
    public readonly numExplod = createBaseFunTrigger(`${this.getPerfix()}NumExplod`);
    public readonly numTarget = createBaseFunTrigger(`${this.getPerfix()}NumTarget`);
    public readonly numEnemy = new BaseTrigger(`${this.getPerfix()}NumEnemy`);
    public readonly numPartner = new BaseTrigger(`${this.getPerfix()}NumPartner`);
    public readonly numProj = new BaseTrigger(`${this.getPerfix()}NumProj`);
    public NumProjID(id: AttrValue) {
        return new BaseTrigger(`${this.getPerfix()}NumProjID(${transAttrValue(id)})`);
    }
    public readonly p2BodyDist = new BaseTrigger(`${this.getPerfix()}P2BodyDist`);
    public readonly p2DistX = new BaseTrigger(`${this.getPerfix()}P2Dist X`);
    public readonly p2DistY = new BaseTrigger(`${this.getPerfix()}P2Dist Y`);
    public readonly p2Life = new BaseTrigger(`${this.getPerfix()}P2Life`);
    public readonly p2MoveType = new MoveType('P2MoveType', this.getPerfix());
    public readonly p2StateNo = new BaseTrigger(`${this.getPerfix()}P2StateNo`);
    public readonly p2StateType = new StateType('P2StateType', this.getPerfix());
    public readonly palNo = new BaseTrigger(`${this.getPerfix()}PalNo`);
    public readonly parentDistX = new BaseTrigger(`${this.getPerfix()}ParentDist X`);
    public readonly parentDistY = new BaseTrigger(`${this.getPerfix()}ParentDist Y`);
    public readonly posX = new BaseTrigger(`${this.getPerfix()}Pos X`);
    public readonly posY = new BaseTrigger(`${this.getPerfix()}Pos Y`);
    public readonly power = new BaseTrigger(`${this.getPerfix()}Power`);
    public readonly powerMax = new BaseTrigger(`${this.getPerfix()}PowerMax`);
    public readonly prevStateNo = new BaseTrigger(`${this.getPerfix()}PrevStateNo`);
    public ProjCancelTime(id: AttrValue) {
        return new BaseTrigger(`${this.getPerfix()}ProjCancelTime(${transAttrValue(id)})`);
    }
    public ProjContact(id?: AttrValue) {
        return new BaseTrigger(`${this.getPerfix()}ProjContact${transAttrValue(id || '')}`);
    }
    public ProjContactTime(id: AttrValue) {
        return new BaseTrigger(`${this.getPerfix()}ProjContactTime(${transAttrValue(id)})`);
    }
    public ProjGuarded(id?: AttrValue) {
        return new BaseTrigger(`${this.getPerfix()}ProjGuarded${transAttrValue(id || '')}`);
    }
    public ProjGuardedTime(id: AttrValue) {
        return new BaseTrigger(`${this.getPerfix()}ProjGuardedTime(${transAttrValue(id)})`);
    }
    public ProjHit(id?: AttrValue) {
        return new BaseTrigger(`${this.getPerfix()}ProjHit${transAttrValue(id || '')}`);
    }
    public ProjHitTime(id: AttrValue) {
        return new BaseTrigger(`${this.getPerfix()}ProjHitTime(${transAttrValue(id)})`);
    }
    public readonly rightEdge = new BaseTrigger(`${this.getPerfix()}RightEdge`);
    public readonly rootDistX = new BaseTrigger(`${this.getPerfix()}RootDist X`);
    public readonly rootDistY = new BaseTrigger(`${this.getPerfix()}RootDist Y`);
    public readonly roundsExisted = new BaseTrigger(`${this.getPerfix()}RoundsExisted`);
    public readonly roundNo = new BaseTrigger(`${this.getPerfix()}RoundNo`);
    public readonly roundState = new BaseTrigger(`${this.getPerfix()}RoundState`);
    public readonly screenHeight = new BaseTrigger(`${this.getPerfix()}ScreenHeight`);
    public readonly screenPosX = new BaseTrigger(`${this.getPerfix()}ScreenPos X`);
    public readonly screenPosY = new BaseTrigger(`${this.getPerfix()}ScreenPos Y`);
    public readonly screenWidth = new BaseTrigger(`${this.getPerfix()}ScreenWidth`);
    public readonly stateNo = new BaseTrigger(`${this.getPerfix()}StateNo`);
    public readonly stateType = new StateType('StateType', this.getPerfix());
    public readonly teamMode = new TeamMode('TeamMode', this.getPerfix());
    public readonly teamSide = new BaseTrigger(`${this.getPerfix()}TeamSide`);
    public readonly time = new BaseTrigger(`${this.getPerfix()}Time`);
    public readonly topEdge = new BaseTrigger(`${this.getPerfix()}TopEdge`);
    public readonly uniqHitCount = new BaseTrigger(`${this.getPerfix()}UniqHitCount`);
    public readonly velX = new BaseTrigger(`${this.getPerfix()}Vel X`);
    public readonly velY = new BaseTrigger(`${this.getPerfix()}Vel Y`);
    public readonly win = new BaseTrigger(`${this.getPerfix()}Win`);
    public readonly winKO = new BaseTrigger(`${this.getPerfix()}WinKO`);
    public readonly winTime = new BaseTrigger(`${this.getPerfix()}WinTime`);
    public readonly winPerfect = new BaseTrigger(`${this.getPerfix()}WinPerfect`);


    // constant.ts
    public readonly data = new ConstData(this.perfix);
    public readonly size = new ConstSize(this.perfix);
    public readonly velocity = new ConstVelocity(this.perfix);
    public readonly movement = new ConstMovement(this.perfix);


    // names.ts
    public readonly authorName = new Name('AuthorName', this.perfix);
    public readonly name = new Name('Name', this.perfix);
    public readonly p1Name = new Name('p1Name', this.perfix);
    public readonly p2Name = new Name('p2Name', this.perfix);
    public readonly p3Name = new Name('p3Name', this.perfix);
    public readonly p4Name = new Name('p4Name', this.perfix);
    public readonly command = new Name('Command', this.perfix);


    // anim.ts
    public readonly anim = new BaseTrigger(`${this.getPerfix()}Anim`);
    public readonly animelem = new BaseTrigger(`${this.getPerfix()}AnimElem`);
    public readonly animtime = new BaseTrigger(`${this.getPerfix()}AnimTime`);
    public AnimElemNo(id: AttrValue) {
        return new BaseTrigger(`${this.getPerfix()}AnimElemNo(${transAttrValue(id)})`);
    }
    public AnimElemTime(id: AttrValue) {
        return new BaseTrigger(`${this.getPerfix()}AnimElemTime(${transAttrValue(id)})`);
    }
    public AnimExist(id: AttrValue) {
        return new BaseTrigger(`${this.getPerfix()}AnimExist(${transAttrValue(id)})`);
    }
    public SelfAnimExist(id: AttrValue) {
        return new BaseTrigger(`${this.getPerfix()}SelfAnimExist(${transAttrValue(id)})`);
    }

    // calculate.ts
    /**
     * 返回自然数 e 的值(2.718281828...)
     */
    public readonly E = new BaseTrigger(`${this.getPerfix()}E`);
    /**
     * 圆周率 PI
     */
    public readonly PI = new BaseTrigger(`${this.getPerfix()}Pi`);
    /**
     * 随机数
     */
    public readonly random = new BaseTrigger(`${this.getPerfix()}Random`);
    /**
     * 返回每秒的帧数.用于计算时间方面.
     */
    public readonly ticksPerSecond = new BaseTrigger(`${this.getPerfix()}TicksPerSecond`);


    public var(index: AttrValue) {
        return new BaseTrigger(`${this.getPerfix()}var(${transAttrValue(index)})`);
    }
    public fvar(index: AttrValue) {
        return new BaseTrigger(`${this.getPerfix()}fvar(${transAttrValue(index)})`);
    }
    public sysFVar(index: AttrValue) {
        return new BaseTrigger(`${this.getPerfix()}SysFVar(${transAttrValue(index)})`);
    }
    public sysVar(index: AttrValue) {
        return new BaseTrigger(`${this.getPerfix()}SysVar(${transAttrValue(index)})`);
    }
}

export class Attributes extends BaseAttributes {
    public constructor(perfix: string = '') {
        super(perfix);
    }
    // attributes.ts
    public readonly root = new BaseAttributes(`${this.getPerfix()}root`);
    public readonly parent = new BaseAttributes(`${this.getPerfix()}parent`);
    public readonly partner = new BaseAttributes(`${this.getPerfix()}partner`);
    public readonly enemynear = new BaseAttributes(`${this.getPerfix()}enemynear`);
    public readonly target = new BaseAttributes(`${this.getPerfix()}target`);
    public Helper(id: AttrValue) {
        return new BaseAttributes(`${this.getPerfix()}Helper(${transAttrValue(id)})`);
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
export function playerId(id: AttrValue) {
    return new Attributes(`playerId(${transAttrValue(id)})`);
}
