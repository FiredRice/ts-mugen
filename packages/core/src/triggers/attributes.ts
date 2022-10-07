import { AttrValue, BaseValue } from '../types';
import { Name } from './names';
import { BasePerfix, BaseTrigger, createBaseFunTrigger } from './base';
import { ConstData, ConstMovement, ConstSize, ConstVelocity } from './constant';
import { HitDefAttr, MoveType, StateType, TeamMode } from './model';
import { transAttrValue } from '../utils';

class BaseAttributes extends BasePerfix {
    constructor(perfix: string = '') {
        super(perfix);
    }

    // variable.ts
    public get AILevel() {
        return new BaseTrigger(`${this.getPerfix()}AILevel`);
    }
    public get alive() {
        return new BaseTrigger(`${this.getPerfix()}Alive`);
    }
    public get backEdge() {
        return new BaseTrigger(`${this.getPerfix()}BackEdge`);
    }
    public get backEdgeBodyDist() {
        return new BaseTrigger(`${this.getPerfix()}BackEdgeBodyDist`);
    }
    public get backEdgeDist() {
        return new BaseTrigger(`${this.getPerfix()}BackEdgeDist`);
    }
    public get bottomEdge() {
        return new BaseTrigger(`${this.getPerfix()}BottomEdge`);
    }
    public get canRecover() {
        return new BaseTrigger(`${this.getPerfix()}CanRecover`);
    }
    public get ctrl() {
        return new BaseTrigger(`${this.getPerfix()}Ctrl`);
    }
    public get facing() {
        return new BaseTrigger(`${this.getPerfix()}facing`);
    }
    public get frontEdge() {
        return new BaseTrigger(`${this.getPerfix()}FrontEdge`);
    }
    public get frontEdgeBodyDist() {
        return new BaseTrigger(`${this.getPerfix()}FrontEdgeBodyDist`);
    }
    public get frontEdgeDist() {
        return new BaseTrigger(`${this.getPerfix()}FrontEdgeDist`);
    }
    public get getHitVar() {
        return new BaseTrigger(`${this.getPerfix()}GetHitVar`);
    }
    public get hitCount() {
        return new BaseTrigger(`${this.getPerfix()}HitCount`);
    }
    public get hitDefAttr() {
        return new HitDefAttr(this.getPerfix());
    }
    public get hitFall() {
        return new BaseTrigger(`${this.getPerfix()}HitFall`);
    }
    public get hitOver() {
        return new BaseTrigger(`${this.getPerfix()}HitOver`);
    }
    public get hitPauseTime() {
        return new BaseTrigger(`${this.getPerfix()}HitPauseTime`);
    }
    public get hitShakeOver() {
        return new BaseTrigger(`${this.getPerfix()}HitShakeOver`);
    }
    public get hitVelX() {
        return new BaseTrigger(`${this.getPerfix()}HitVel X`);
    }
    public get hitVelY() {
        return new BaseTrigger(`${this.getPerfix()}HitVel Y`);
    }
    /**
     * 返回玩家的ID号
     */
    public get ID() {
        return new BaseTrigger(`${this.getPerfix()}ID`);
    }
    public get inGuardDist() {
        return new BaseTrigger(`${this.getPerfix()}InGuardDist`);
    }
    public get IsHelper() {
        return createBaseFunTrigger(`${this.getPerfix()}IsHelper`);
    }
    public get isHomeTeam() {
        return new BaseTrigger(`${this.getPerfix()}IsHomeTeam`);
    }
    public get leftEdge() {
        return new BaseTrigger(`${this.getPerfix()}LeftEdge`);
    }
    public get life() {
        return new BaseTrigger(`${this.getPerfix()}Life`);
    }
    public get lifeMax() {
        return new BaseTrigger(`${this.getPerfix()}LifeMax`);
    }
    public get lose() {
        return new BaseTrigger(`${this.getPerfix()}Lose`);
    }
    public get loseKO() {
        return new BaseTrigger(`${this.getPerfix()}LoseKO`);
    }
    public get loseTime() {
        return new BaseTrigger(`${this.getPerfix()}LoseTime`);
    }
    public get matchNo() {
        return new BaseTrigger(`${this.getPerfix()}MatchNo`);
    }
    public get matchOver() {
        return new BaseTrigger(`${this.getPerfix()}MatchOver`);
    }
    public get moveContact() {
        return new BaseTrigger(`${this.getPerfix()}MoveContact`);
    }
    public get moveGuarded() {
        return new BaseTrigger(`${this.getPerfix()}MoveGuarded`);
    }
    public get moveHit() {
        return new BaseTrigger(`${this.getPerfix()}MoveHit`);
    }
    public get moveReversed() {
        return new BaseTrigger(`${this.getPerfix()}MoveReversed`);
    }
    public get moveType() {
        return new MoveType('MoveType', this.getPerfix());
    }
    public get NumHelper() {
        return createBaseFunTrigger(`${this.getPerfix()}NumHelper`);
    }
    public get NumExplod() {
        return createBaseFunTrigger(`${this.getPerfix()}NumExplod`);
    }
    public get NumTarget() {
        return createBaseFunTrigger(`${this.getPerfix()}NumTarget`);
    }
    public get NumEnemy() {
        return new BaseTrigger(`${this.getPerfix()}NumEnemy`);
    }
    public get NumPartner() {
        return new BaseTrigger(`${this.getPerfix()}NumPartner`);
    }
    public get NumProj() {
        return new BaseTrigger(`${this.getPerfix()}NumProj`);
    }
    public NumProjID(id: AttrValue) {
        return new BaseTrigger(`${this.getPerfix()}NumProjID(${transAttrValue(id)})`);
    }
    public get p2BodyDist() {
        return new BaseTrigger(`${this.getPerfix()}P2BodyDist`);
    }
    public get p2DistX() {
        return new BaseTrigger(`${this.getPerfix()}P2Dist X`);
    }
    public get p2DistY() {
        return new BaseTrigger(`${this.getPerfix()}P2Dist Y`);
    }
    public get p2Life() {
        return new BaseTrigger(`${this.getPerfix()}P2Life`);
    }
    public get p2MoveType() {
        return new MoveType('P2MoveType', this.getPerfix());
    }
    public get p2StateNo() {
        return new BaseTrigger(`${this.getPerfix()}P2StateNo`);
    }
    public get p2StateType() {
        return new StateType('P2StateType', this.getPerfix());
    }
    public get palNo() {
        return new BaseTrigger(`${this.getPerfix()}PalNo`);
    }
    public get parentDistX() {
        return new BaseTrigger(`${this.getPerfix()}ParentDist X`);
    }
    public get parentDistY() {
        return new BaseTrigger(`${this.getPerfix()}ParentDist Y`);
    }
    public get posX() {
        return new BaseTrigger(`${this.getPerfix()}Pos X`);
    }
    public get posY() {
        return new BaseTrigger(`${this.getPerfix()}Pos Y`);
    }
    public get power() {
        return new BaseTrigger(`${this.getPerfix()}Power`);
    }
    public get powerMax() {
        return new BaseTrigger(`${this.getPerfix()}PowerMax`);
    }
    public get prevStateNo() {
        return new BaseTrigger(`${this.getPerfix()}PrevStateNo`);
    }
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
    public get rightEdge() {
        return new BaseTrigger(`${this.getPerfix()}RightEdge`);
    }
    public get rootDistX() {
        return new BaseTrigger(`${this.getPerfix()}RootDist X`);
    }
    public get rootDistY() {
        return new BaseTrigger(`${this.getPerfix()}RootDist Y`);
    }
    public get roundsExisted() {
        return new BaseTrigger(`${this.getPerfix()}RoundsExisted`);
    }
    public get stateNo() {
        return new BaseTrigger(`${this.getPerfix()}StateNo`);
    }
    public get stateType() {
        return new StateType('StateType', this.getPerfix());
    }
    public get teamMode() {
        return new TeamMode('TeamMode', this.getPerfix());
    }
    public get teamSide() {
        return new BaseTrigger(`${this.getPerfix()}TeamSide`);
    }
    public get time() {
        return new BaseTrigger(`${this.getPerfix()}Time`);
    }
    public get topEdge() {
        return new BaseTrigger(`${this.getPerfix()}TopEdge`);
    }
    public get uniqHitCount() {
        return new BaseTrigger(`${this.getPerfix()}UniqHitCount`);
    }
    public get velX() {
        return new BaseTrigger(`${this.getPerfix()}Vel X`);
    }
    public get velY() {
        return new BaseTrigger(`${this.getPerfix()}Vel Y`);
    }
    public get win() {
        return new BaseTrigger(`${this.getPerfix()}Win`);
    }
    public get winKO() {
        return new BaseTrigger(`${this.getPerfix()}WinKO`);
    }
    public get winTime() {
        return new BaseTrigger(`${this.getPerfix()}WinTime`);
    }
    public get winPerfect() {
        return new BaseTrigger(`${this.getPerfix()}WinPerfect`);
    }


    // constant.ts
    public get data() {
        return new ConstData(this.perfix);
    }
    public get size() {
        return new ConstSize(this.perfix);
    }
    public get velocity() {
        return new ConstVelocity(this.perfix);
    }
    public get movement() {
        return new ConstMovement(this.perfix);
    }


    // names.ts
    public get authorName() {
        return new Name('AuthorName', this.perfix);
    }
    public get name() {
        return new Name('Name', this.perfix);
    }

    // anim.ts
    public get anim() {
        return new BaseTrigger(`${this.getPerfix()}Anim`);
    }
    public get animelem() {
        return new BaseTrigger(`${this.getPerfix()}AnimElem`);
    }
    public get animtime() {
        return new BaseTrigger(`${this.getPerfix()}AnimTime`);
    }
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
    public get root() {
        return new BaseAttributes(`${this.getPerfix()}root`);
    }
    public get parent() {
        return new BaseAttributes(`${this.getPerfix()}parent`);
    }
    public get partner() {
        return new BaseAttributes(`${this.getPerfix()}partner`);
    }
    public get enemynear() {
        return new BaseAttributes(`${this.getPerfix()}enemynear`);
    }
    public get target() {
        return new BaseAttributes(`${this.getPerfix()}target`);
    }
    public Helper(id: AttrValue) {
        return new BaseAttributes(`${this.getPerfix()}Helper(${transAttrValue(id)})`);
    }
    public EnemyNear(stateno: BaseValue) {
        return new BaseAttributes(`${this.getPerfix()}EnemyNear(${stateno})`);
    }
}

class MugenGlobal extends Attributes {
    constructor() {
        super();
    }
    // name.ts
    public get p1Name() {
        return new Name('p1Name');
    }
    public get p2Name() {
        return new Name('p2Name');
    }
    public get p3Name() {
        return new Name('p3Name');
    }
    public get p4Name() {
        return new Name('p4Name');
    }
    public get command() {
        return new Name('Command');
    }

    // calculate.ts
    /**
     * 返回自然数 e 的值(2.718281828...)
     */
    public get E() {
        return new BaseTrigger('E');
    }
    /**
     * 圆周率 PI
     */
    public get Pi() {
        return new BaseTrigger('Pi');
    }
    /**
     * 随机数
     */
    public get Random() {
        return new BaseTrigger('Random');
    }
    /**
     * 返回每秒的帧数.用于计算时间方面.
     */
    public get TicksPerSecond() {
        return new BaseTrigger('TicksPerSecond');
    }

    // variable.ts
    public get cameraPosX() {
        return new BaseTrigger('CameraPos X');
    }
    public get cameraPosY() {
        return new BaseTrigger('CameraPos Y');
    }
    public get cameraZoom() {
        return new BaseTrigger('CameraZoom');
    }
    public get drawGame() {
        return new BaseTrigger('DrawGame');
    }
    public get gameHeight() {
        return new BaseTrigger('GameHeight');
    }
    public get gameTime() {
        return new BaseTrigger('GameTime');
    }
    public get gameWidth() {
        return new BaseTrigger('GameWidth');
    }
    public get roundNo() {
        return new BaseTrigger('RoundNo');
    }
    public get roundState() {
        return new BaseTrigger('RoundState');
    }
    public get screenHeight() {
        return new BaseTrigger('ScreenHeight');
    }
    public get screenPosX() {
        return new BaseTrigger('ScreenPos X');
    }
    public get screenPosY() {
        return new BaseTrigger('ScreenPos Y');
    }
    public get screenWidth() {
        return new BaseTrigger('ScreenWidth');
    }
}

// 全局变量
export const global = new MugenGlobal();

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
