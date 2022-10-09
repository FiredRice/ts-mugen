import { AttrValue, BaseValue } from '../types';
import { transAttrValue, transStr } from '../utils';
import { BaseTrigger, createBaseFunTrigger } from './base';
import { HitDefAttr, MoveType, StateType, TeamMode } from './model';


export const AILevel = new BaseTrigger('AILevel');
export const alive = new BaseTrigger('Alive');


export const backEdge = new BaseTrigger('BackEdge');
export const backEdgeBodyDist = new BaseTrigger('BackEdgeBodyDist');
export const backEdgeDist = new BaseTrigger('BackEdgeDist');
export const bottomEdge = new BaseTrigger('BottomEdge');


export const cameraPosX = new BaseTrigger('CameraPos X');
export const cameraPosY = new BaseTrigger('CameraPos Y');
export const cameraZoom = new BaseTrigger('CameraZoom');
export const canRecover = new BaseTrigger('CanRecover');
export const ctrl = new BaseTrigger('Ctrl');


export const drawGame = new BaseTrigger('DrawGame');


export const facing = new BaseTrigger('facing');


export const frontEdge = new BaseTrigger('FrontEdge');
export const frontEdgeBodyDist = new BaseTrigger('FrontEdgeBodyDist');
export const frontEdgeDist = new BaseTrigger('FrontEdgeDist');


export const gameHeight = new BaseTrigger('GameHeight');
export const gameTime = new BaseTrigger('GameTime');
export const gameWidth = new BaseTrigger('GameWidth');
export const getHitVar = new BaseTrigger('GetHitVar');


export const hitCount = new BaseTrigger('HitCount');
export const hitDefAttr = new HitDefAttr('HitDefAttr');
export const hitFall = new BaseTrigger('HitFall');
export const hitOver = new BaseTrigger('HitOver');
export const hitPauseTime = new BaseTrigger('HitPauseTime');
export const hitShakeOver = new BaseTrigger('HitShakeOver');
export const hitVelX = new BaseTrigger('HitVel X');
export const hitVelY = new BaseTrigger('HitVel Y');


export const ID = new BaseTrigger('ID');
export const inGuardDist = new BaseTrigger('InGuardDist');
export const isHomeTeam = new BaseTrigger('IsHomeTeam');
/**
 * 是否为 helper
 */
export const IsHelper = createBaseFunTrigger('IsHelper');


export const leftEdge = new BaseTrigger('LeftEdge');
export const life = new BaseTrigger('Life');
export const lifeMax = new BaseTrigger('LifeMax');
export const lose = new BaseTrigger('Lose');
export const loseKO = new BaseTrigger('LoseKO');
export const loseTime = new BaseTrigger('LoseTime');


export const matchNo = new BaseTrigger('MatchNo');
export const matchOver = new BaseTrigger('MatchOver');
export const moveContact = new BaseTrigger('MoveContact');
export const moveGuarded = new BaseTrigger('MoveGuarded');
export const moveHit = new BaseTrigger('MoveHit');
export const moveReversed = new BaseTrigger('MoveReversed');
export const moveType = new MoveType('MoveType');

/**
 * helper 数量
 */
export const NumHelper = createBaseFunTrigger('NumHelper');

/**
 * 动画数量
 */
export const NumExplod = createBaseFunTrigger('NumExplod');

/**
 * target 数量
 */
export const NumTarget = createBaseFunTrigger('NumTarget');

/**
 * 返回存在的对手数量.中立玩家和普通援助不计算在内
 */
export const NumEnemy = new BaseTrigger(`NumEnemy`);

/**
 * 返回存在的partner(同伴)数量.中立的玩家和普通的helper不被认为是partner
 */
export const NumPartner = new BaseTrigger(`NumPartner`);

/**
 * 返回玩家当前拥有的所有飞行道具数量
 */
export const NumProj = new BaseTrigger(`NumProj`);

/**
 * 返回玩家当前拥有的指定ID号的飞行道具数量
 */
export function NumProjID(id: AttrValue) {
    return new BaseTrigger(`NumProjID(${transAttrValue(id)})`);
}


export const p2BodyDist = new BaseTrigger('P2BodyDist');
export const p2DistX = new BaseTrigger('P2Dist X');
export const p2DistY = new BaseTrigger('P2Dist Y');
export const p2Life = new BaseTrigger('P2Life');
export const p2MoveType = new MoveType('P2MoveType');
export const p2StateNo = new BaseTrigger('P2StateNo');
export const p2StateType = new StateType('P2StateType');
export const palNo = new BaseTrigger('PalNo');
export const parentDistX = new BaseTrigger('ParentDist X');
export const parentDistY = new BaseTrigger('ParentDist Y');
export const posX = new BaseTrigger('Pos X');
export const posY = new BaseTrigger('Pos Y');
export const power = new BaseTrigger('Power');
export const powerMax = new BaseTrigger('PowerMax');
export const prevStateNo = new BaseTrigger('PrevStateNo');
export const ProjCancelTime = (id: AttrValue) => new BaseTrigger(`ProjCancelTime(${transAttrValue(id)})`);
export const ProjContact = (id?: AttrValue) => new BaseTrigger(`ProjContact(${transAttrValue(id || '')})`);
export const ProjContactTime = (id: AttrValue) => new BaseTrigger(`ProjContactTime(${transAttrValue(id)})`);
export const ProjGuarded = (id?: AttrValue) => new BaseTrigger(`ProjGuarded(${transAttrValue(id || '')})`);
export const ProjGuardedTime = (id: AttrValue) => new BaseTrigger(`ProjGuardedTime(${transAttrValue(id)})`);
export const ProjHit = (id?: AttrValue) => new BaseTrigger(`ProjHit(${transAttrValue(id || '')})`);
export const ProjHitTime = (id: AttrValue) => new BaseTrigger(`ProjHitTime(${transAttrValue(id)})`);


export const rightEdge = new BaseTrigger('RightEdge');
export const rootDistX = new BaseTrigger('RootDist X');
export const rootDistY = new BaseTrigger('RootDist Y');
export const roundNo = new BaseTrigger('RoundNo');
export const roundsExisted = new BaseTrigger('RoundsExisted');
export const roundState = new BaseTrigger('RoundState');


export const screenHeight = new BaseTrigger('ScreenHeight');
export const screenPosX = new BaseTrigger('ScreenPos X');
export const screenPosY = new BaseTrigger('ScreenPos Y');
export const screenWidth = new BaseTrigger('ScreenWidth');

type InfoParams = 'info.name' | 'info.displayname' | 'info.authorname';
export function StageVar(value: InfoParams) {
    const name = `StageVar(${value})`;

    /**
     * 等于
     */
    function equal(value: BaseValue) {
        return `${name} = "${transStr(value)}"`;
    }

    /**
     * 不等于
     */
    function notEqual(value: BaseValue) {
        return `${name} != "${transStr(value)}"`;
    }

    return {
        value: name,
        equal,
        notEqual
    };
}

export const stateNo = new BaseTrigger('StateNo');
export const stateType = new StateType('StateType');
export function sysFVar(value: AttrValue) {
    return new BaseTrigger(`SysFVar(${transAttrValue(value)})`);
}
export function sysVar(value: AttrValue) {
    return new BaseTrigger(`SysVar(${transAttrValue(value)})`);
}


export const teamMode = new TeamMode('TeamMode');
export const teamSide = new StateType('TeamSide');
export const topEdge = new BaseTrigger('TopEdge');
export const time = new BaseTrigger('Time');


export const uniqHitCount = new BaseTrigger('UniqHitCount');


export const velX = new BaseTrigger('Vel X');
export const velY = new BaseTrigger('Vel Y');


export const win = new BaseTrigger('Win');
export const winKO = new BaseTrigger('WinKO');
export const winTime = new BaseTrigger('WinTime');
export const winPerfect = new BaseTrigger('WinPerfect');