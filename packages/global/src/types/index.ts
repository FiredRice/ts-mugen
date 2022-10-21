import { Attributes, AttrValue, BaseAttributes, BaseValue, ConstData, ConstMovement, ConstSize, ConstVelocity, Helper, Name, StateType } from '@tsmugen/core';
import { BaseTrigger } from '@tsmugen/core/lib/types/triggers/base';
import { HitDefAttr, MoveType, SysFVar, SysVar, TeamMode } from '@tsmugen/core/lib/types/triggers/model';

type InfoParams = 'info.name' | 'info.displayname' | 'info.authorname';
declare global {
    const anim: BaseTrigger;
    const animelem: BaseTrigger;
    const animtime: BaseTrigger;
    function AnimElemNo(elementValue: AttrValue): BaseTrigger;
    function AnimElemTime(elementValue: AttrValue): BaseTrigger;
    function AnimExist(elementValue: AttrValue): BaseTrigger;
    function SelfAnimExist(elementValue: AttrValue): BaseTrigger;


    interface Root extends Attributes { }
    const root: Root;

    interface Parent extends Attributes { }
    const parent: Parent;

    interface Partner extends Attributes { }
    const partner: Partner;

    interface Enemynear extends Attributes { }
    const enemynear: Enemynear;
    function EnemyNear(stateno: AttrValue): Enemynear;
    
    interface Enemy extends Attributes { }
    const enemy: Enemy;
    function Enemy(index: AttrValue): Enemy;
    
    interface Target extends Attributes { }
    const target: Target;
    
    interface PlayerId extends Attributes { }
    function playerId(id: AttrValue): PlayerId;


    const data: ConstData;
    const size: ConstSize;
    const velocity: ConstVelocity;
    const movement: ConstMovement;


    const name: Name;
    const p1Name: Name;
    const p2Name: Name;
    const p3Name: Name;
    const p4Name: Name;
    const authorName: Name;
    const command: Name;


    const AILevel: BaseTrigger;
    const alive: BaseTrigger;
    const backEdge: BaseTrigger;
    const backEdgeBodyDist: BaseTrigger;
    const backEdgeDist: BaseTrigger;
    const bottomEdge: BaseTrigger;
    const cameraPosX: BaseTrigger;
    const cameraPosY: BaseTrigger;
    const cameraZoom: BaseTrigger;
    const canRecover: BaseTrigger;
    const ctrl: BaseTrigger;
    const drawGame: BaseTrigger;
    const facing: BaseTrigger;
    const frontEdge: BaseTrigger;
    const frontEdgeBodyDist: BaseTrigger;
    const frontEdgeDist: BaseTrigger;
    const gameHeight: BaseTrigger;
    const gameTime: BaseTrigger;
    const gameWidth: BaseTrigger;
    const getHitVar: BaseTrigger;
    /**
     * mugen 内置关键字，便于与非 Helper 类创建的 helper 区分使用
     */
    function helper(id: AttrValue): BaseAttributes;
    const hitCount: BaseTrigger;
    const hitDefAttr: HitDefAttr;
    const hitFall: BaseTrigger;
    const hitOver: BaseTrigger;
    const hitPauseTime: BaseTrigger;
    const hitShakeOver: BaseTrigger;
    const hitVelX: BaseTrigger;
    const hitVelY: BaseTrigger;
    const ID: BaseTrigger;
    const inGuardDist: BaseTrigger;
    const isHomeTeam: BaseTrigger;
    /**
     * 是否为 helper
     */
    const isHelper: (id?: AttrValue | undefined) => BaseTrigger;
    const leftEdge: BaseTrigger;
    const life: BaseTrigger;
    const lifeMax: BaseTrigger;
    const lose: BaseTrigger;
    const loseKO: BaseTrigger;
    const loseTime: BaseTrigger;
    const matchNo: BaseTrigger;
    const matchOver: BaseTrigger;
    const moveContact: BaseTrigger;
    const moveGuarded: BaseTrigger;
    const moveHit: BaseTrigger;
    const moveReversed: BaseTrigger;
    const moveType: MoveType;
    /**
     * helper 数量
     */
    function NumHelper<T extends Helper>(value?: T): BaseTrigger;
    function NumHelper(value?: AttrValue): BaseTrigger;
    /**
     * 动画数量
     */
    const NumExplod: (id?: AttrValue | undefined) => BaseTrigger;
    /**
     * target 数量
     */
    const NumTarget: (id?: AttrValue | undefined) => BaseTrigger;
    /**
     * 返回存在的对手数量.中立玩家和普通援助不计算在内
     */
    const NumEnemy: BaseTrigger;
    /**
     * 返回存在的partner(同伴)数量.中立的玩家和普通的helper不被认为是partner
     */
    const NumPartner: BaseTrigger;
    /**
     * 返回玩家当前拥有的所有飞行道具数量
     */
    const NumProj: BaseTrigger;
    /**
     * 返回玩家当前拥有的指定ID号的飞行道具数量
     */
    function NumProjID(id: AttrValue): BaseTrigger;
    const p2BodyDist: BaseTrigger;
    const p2DistX: BaseTrigger;
    const p2DistY: BaseTrigger;
    const p2Life: BaseTrigger;
    const p2MoveType: MoveType;
    const p2StateNo: BaseTrigger;
    const p2StateType: StateType;
    const palNo: BaseTrigger;
    const parentDistX: BaseTrigger;
    const parentDistY: BaseTrigger;
    const posX: BaseTrigger;
    const posY: BaseTrigger;
    const power: BaseTrigger;
    const powerMax: BaseTrigger;
    const prevStateNo: BaseTrigger;
    const ProjCancelTime: (id: AttrValue) => BaseTrigger;
    const ProjContact: (id?: AttrValue) => BaseTrigger;
    const ProjContactTime: (id: AttrValue) => BaseTrigger;
    const ProjGuarded: (id?: AttrValue) => BaseTrigger;
    const ProjGuardedTime: (id: AttrValue) => BaseTrigger;
    const ProjHit: (id?: AttrValue) => BaseTrigger;
    const ProjHitTime: (id: AttrValue) => BaseTrigger;
    const rightEdge: BaseTrigger;
    const rootDistX: BaseTrigger;
    const rootDistY: BaseTrigger;
    const roundNo: BaseTrigger;
    const roundsExisted: BaseTrigger;
    const roundState: BaseTrigger;
    const screenHeight: BaseTrigger;
    const screenPosX: BaseTrigger;
    const screenPosY: BaseTrigger;
    const screenWidth: BaseTrigger;
    function StageVar(value: InfoParams): {
        value: string;
        equal: (value: BaseValue) => string;
        notEqual: (value: BaseValue) => string;
    };
    const stateNo: BaseTrigger;
    const stateType: StateType;
    function sysFVar(value: AttrValue): SysFVar;
    function sysVar(value: AttrValue): SysVar;
    const teamMode: TeamMode;
    const teamSide: BaseTrigger;
    const topEdge: BaseTrigger;
    const time: BaseTrigger;
    const uniqHitCount: BaseTrigger;
    const velX: BaseTrigger;
    const velY: BaseTrigger;
    const win: BaseTrigger;
    const winKO: BaseTrigger;
    const winTime: BaseTrigger;
    const winPerfect: BaseTrigger;


    /**
     * 计算参数的绝对值
     */
    function Abs(value: AttrValue): BaseTrigger;
    /**
     * 计算指定参数的反正弦值(用弧度制表示)
     */
    function Asin(value: AttrValue): BaseTrigger;
    /**
     * 计算指定参数的arccosine(反余弦)(用弧度制表示)
     */
    function Acos(value: AttrValue): BaseTrigger;
    /**
     * 计算指定参数的反正切(用弧度制表示)
     */
    function Atan(value: AttrValue): BaseTrigger;
    /**
     * 向上取整
     */
    function Ceil(value: AttrValue): BaseTrigger;
    /**
     * 代替ifelse而避免任何由于计算不需要使用的参数而所引起的副作用.
     */
    function Cond(trigger: AttrValue, success: AttrValue, error: AttrValue): BaseTrigger;
    /**
     * 把 240p 坐标空间转换成玩家的坐标空间.
     */
    function Const240p(value: AttrValue): BaseTrigger;
    /**
     * 把 480p 坐标空间转换成玩家的坐标空间.
     */
    function Const480p(value: AttrValue): BaseTrigger;
    /**
     * 把 720p 坐标空间转换成玩家的坐标空间.
     */
    function Const720p(value: AttrValue): BaseTrigger;
    /**
     * 计算指定参数的余弦值(用弧度制表示).
     */
    function Cos(value: AttrValue): BaseTrigger;
    /**
     * 计算自然数 e 的参数次幂.
     * 这种计算方式略微比等价的表达式e**(参数)精确些.
     */
    function Exp(value: AttrValue): BaseTrigger;
    /**
     * 实现floor(向下取整)函数.
     * 返回小于等于参数的最大整数.
     */
    function Floor(value: AttrValue): BaseTrigger;
    /**
     * ifelse
     */
    function IfElse(trigger: AttrValue, success: AttrValue, error: AttrValue): BaseTrigger;
    /**
     * 返回参数的自然对数.
     * 产生的结果比等价的log(e,(argument))更为精确.
     */
    function Ln(value: AttrValue): BaseTrigger;
    /**
     * 返回以a为底,b的对数.
     */
    function Log(a: AttrValue, b: AttrValue): BaseTrigger;
    /**
     * 如果指定ID号的玩家存在则返回1,否则返回0.
     */
    function PlayerIDExist(value: AttrValue): BaseTrigger;
    /**
     * 计算指定参数正弦值(用弧度制表示)
     */
    function Sin(value: AttrValue): BaseTrigger;
    /**
     * 计算指定参数的正切值(弧度制).
     */
    function Tan(value: AttrValue): BaseTrigger;
    /**
     * 返回自然数 e 的值(2.718281828...)
     */
    const E: BaseTrigger;
    /**
    * 圆周率 PI
    */
    const PI: BaseTrigger;
    /**
     * 随机数
     */
    const Random: BaseTrigger;
    /**
    * 返回每秒的帧数.用于计算时间方面.
    */
    const TicksPerSecond: BaseTrigger;
}