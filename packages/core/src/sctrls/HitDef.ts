import { currentWrite } from '../core';
import { AttrValue, BasePostype, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';
import { AfterImageParams } from './AfterImage';

type AnimType = 'light' | 'medium' | 'hard' | 'back' | 'up' | 'diagup';
type P2AttackType = 'High' | 'Low' | 'Trip' | 'None';
type EnvshakeType = {
    /**
     * 指定屏幕将要震动的时间帧数.
     */
    time?: AttrValue;
    /**
     * freq 是一个0(缓慢的)到180(快速的)的浮点数.
     * - 默认为60.
     */
    freq?: AttrValue;
    /**
     * 振幅越大,屏幕上下震动的越远.
     * 
     * 振幅为负数意味着屏幕将首先向下震动.
     * - 默认值是-4(在240p设定下),-8(在480p设定下),-16(在720p设定下).
     */
    ampl?: AttrValue;
    /**
     * 指定震动的相位偏移
     * - 默认为0.
     * - 频率乘数大于等于90时,默认相位偏移是90.
     */
    phase?: AttrValue;
};

interface HitDefParams extends BaseSctrls {
    /**
     * 这是攻击的属性.用来确定是否攻击可以击中P2.格式为:
     * ```
     * attr = arg1, arg2`
     * ```
     * 这里:arg1是"S","C","A"任意组合.
     * 
     * 类似于StateDef中的"statetype",这里说明是否攻击类型为站立,蹲下或者空中.
     * 
     * arg2是由2字符组成的字符串.首字符是"N"(普通),"S"(特殊),"H"(超级)中的一个.
     * 
     * 第2个字符必须是"A"(普通攻击),"T"(投掷类攻击),"P"(飞行道具攻击)中一个.
     */
    attr: string;
    /**
     * 此参数说明如果P1要击中P2,则P2必须处于的状态类型.
     * 
     * hit_flags是一个包含了下列组合的字符串:
     * - "H"(上段),"L"(下段),"A"(空中).
     * - "M"(中段)等于"HL".
     * - "F"作用于下落状态,如果包含了"F"将允许P1对处于空中下落状态的对手进行连击.
     * - "D"作用于"躺下"的时候,如果包含了"D"将允许P1击中躺在地上的对手.
     * - "H","L"或"A" (或"M")必须出现在hitflag字符串中.
     * - "+"和"-"是2个可选字符.
     * 
     * 如果加上了"+",则hit仅在别人处于受击状态时有效.
     * 
     * 这也许对chain-moves(招式连击)有用,而将不会对某些对手起作用,这些对手指的是没有被招式连击中第一招击中的对手.
     * 
     * (上面这句话举例子说就是,连招中只有第1招击中了对手,第2招才能击中("+"字符用于此种情况下).
     * 
     * 如果第1招没击中,即使第2招动作做出来,且红框与对手兰框接触,也不会判定击中对手(因为此时对手没有处于受击状态)) 
     * 
     * 如果加上了"-",则hit仅在玩家不处于受击状态时有效.
     * 
     * 你应该在投掷攻击和其他不想让P1能够连击的招式中使用"-".(KOF98中大部分的慢性投掷技都是这类判定)
     * 
     * "+"和"-"是互斥的,即,不能同时使用.
     * - 缺省hitflag默认值为"MAF".
     */
    hitflag?: string;
    /**
     * (感觉guardflag = guard_flags更形象)
     * 
     * 此参数决定P2要如何防御住这次攻击.guard_flags是一个包含了下列字符组合的字符串:
     * - "H"(上段),"L"(下段),"A"(空中)."M"(中段)等于"HL".
     * - 缺省默认是一个empty(空的)字符串,意味着P2无法防御这次攻击.
     */
    guardflag?: string;
    /**
     * team_type指定HitDef能击中哪个队伍的玩家.
     * - B：2个队伍(所有玩家),
     * - E：敌方队伍(对手)或者 
     * - F：友方队伍(你自己的队伍).
     * - 默认为E.
     */
    affectteam?: 'B' | 'E' | 'F';
    /**
     * 指的是当被击中时P2将进入的动画类型.
     * 
     * 从"light", "medium", "hard", "back", "up",或 "diagup"中选择.前3个(意思)是不言自明的(受 轻,中,重 攻击).
     * 
     * "Back"是P2被打翻天时的动画."Up"应该在人物笔直向上被打到空中时使用(例如,被上勾拳).
     * 
     * "DiagUp"应被用于人物被打到空中,向后,最终头着地. 
     * - 默认值是"Light".
     */
    animtype?: AnimType;
    /**
     * priority = hit_prior (整型), hit_type (字符串型) 
     * 
     * 指定hit的优先级(优先顺序).高优先级的hit优先于低优先级的hit.
     * 
     * - hit_prior的有效值是1-7,默认是4.
     * 
     * 如果指定了hit_type则给出了hit的优先级类别.
     * 
     * 有效的优先级类别是Dodge,Hit,Miss.
     * 
     * 优先级类别决定了当相同hit优先级的P1和P2相互同时击中对方时的决定性特征.
     * 
     * P1 vs. P2 时的特征如下:
     * - Hit vs. Hit: P1和P2同时击中对方. 
     * - Hit vs. Miss: P1击中,P2没击中. 
     * - Hit vs. Dodge: 都没击中.
     * - Dodge vs. Dodge: 都没击中.
     * - Dodge vs. Miss: 都没击中.
     * - Miss vs. Miss: 都没击中.
     * 
     * 在都没击中的情况下,各自的HitDef仍保持有效.
     * 
     * "Miss" 或 "Dodge" 通常用于投掷,因为这里P1和P2不应该能同时击中对手.
     * 
     * - hit_type默认值是"Hit".
     */
    priority?: [AttrValue, 'Hit' | 'Miss' | 'Dodge'];
    /**
     * hit_damage是P2被击中时的伤害值.可选的guard_damage参数是P2防御住攻击时的伤害值.
     * - 如果都忽略,则默认为0.
     */
    damage?: [AttrValue, AttrValue];
    /**
     * 这是hit时每个玩家将会停止(停顿)的时间(打击停顿,ignorehitpause就是针对这个参数).
     * - p1_pausetime是冻结P1的时间,单位是游戏帧数.
     * - p2_pausetime是在被击中后退前造成P2震动的时间.
     * - 缺省则默认为0,0.
     */
    pausetime?: [AttrValue, AttrValue];
    /**
     * 如果成功击中显示的火花动作号.
     * 
     * 要播放玩家的.air文件之外的火花(fightfx),在动作号前面加上S,
     * 
     * 例如：`sparkno = S10`
     * - 缺省默认为玩家变量中设置的值.(在cns文件[Data]组下面)
     */
    sparkno?: AttrValue;
    /**
     * 这是创建 击中/防御 火花的位置.spark_x是相对于P2前方的坐标值.负值使火花更深入P2内部.
     * 
     * 这里说的"前方"指的是P2坐标轴指向P1的x方向偏移量除去P2玩家变量[Size]组中相应的宽度值.
     * 
     * (就是说如果spark_x=0,那这个位置相对于P2就是他的前方(也就是p2[Size]组中ground.front这个位置.)
     * 
     * 相对于P1来说就是P1和P2坐标原点的距离减去P2的ground.front,也就是上面说的指向P2的距离减去了P2的宽度参数. )
     * 
     * spark_y相对于P1.负值使火花更高.
     * 
     * 你能使用AirView这类工具来测定这些值.(通过将光标放在 "attack spot" 然后读出y方向数值)
     * - 缺省默认是0,0.
     */
    sparkxy?: [AttrValue, AttrValue];
    /**
     * 在hit时播放的声音(从common.snd中).内置的fight.snd可让你选择从5,0(轻击声音)到5,4(痛苦重击).
     * 
     * 要从玩家自己的SND文件中播放声音,在第一个数字前加上"S".例如,"hitsound = S1,0".
     * - 缺省默认为玩家变量中设置的值.
     */
    hitsound?: [AttrValue, AttrValue] | string;
    /**
     * 在hit被防御住时播放的声音(从common.snd中).目前仅有6,0可用.
     * 
     * 要从玩家自己的SND文件中播放声音,在第一个数字前加上"S".
     * 
     * 没有设备支持从对手的SND文件中播放声音.
     * - 缺省默认为玩家变量中设置的值.
     */
    guardsound?: [AttrValue, AttrValue] | string;
    /**
     * 击中后给予P2y方向的加速度.
     * - 默认是0.35(240p),0.7(480p),1.4(720p).
     */
    yaccel?: AttrValue;
    /**
     * 控制在P2被击中后相对于P1最小距离.
     * 
     * 这个参数不常用.
     * - 缺省默认不改变P2位置.
     */
    mindist?: [AttrValue, AttrValue];
    /**
     * 控制在P2被击中后相对于P1最大距离.
     * 
     * 这个参数不常用.
     * - 缺省默认不改变P2位置.
     */
    maxdist?: [AttrValue, AttrValue];
    /**
     * 击中后移动P2到相对于P1的指定位置.这参数不常用.
     * 
     * 如果你想在投掷中捕捉P2到一个特定的位置,建议你在P1投掷状态中使用TargetBind控制器来代替.
     * - 缺省默认不改变P2位置.
     */
    snap?: [AttrValue, AttrValue];
    /**
     * 绘制P1图像的优先级如果招式击中或被P2防御住.
     * 
     * 与p2sprpriority参数一起,控制是否P1绘制在P2上方或下方.
     * - 默认值是1.
     */
    p1sprpriority?: AttrValue;
    /**
     * 绘制P2图像的优先级如果招式击中或被P2防御住.
     * - 默认值是0.
     */
    p2sprpriority?: AttrValue;
    /**
     * 如果成功击中,设置-1使P1转向.
     * - 默认值保持P1朝向不变.
     */
    p1facing?: AttrValue;
    /**
     * 设置1让P1的朝向与P2被击中后一致,-1使P1和P2反向.
     * - 默认为0(不改变).如果非0,则此参数优先于p1facing.
     */
    p1getp2facing?: AttrValue;
    /**
     * 如果成功击中,设置1使P2与P1朝向相同,-1使P2朝向相反.
     * - 默认值是0,不改变P2朝向.
     */
    p2facing?: AttrValue;
    /**
     * 如果成功击中,设置P1进入的状态号.这个状态必须是一个攻击状态(movetype = A)且至少要有1帧.
     * 
     * 主要用于投掷.
     * - 默认是-1,不改变.
     */
    p1stateno?: AttrValue;
    /**
     * 如果成功击中,设置P2进入的状态号.P2将获得P1(指定的)状态和动画数据.
     * 
     * P2将保持P1(指定的)状态和动画数据直到P2开始攻击,或者SelfState控制器被使用,返回P2到他自己的状态.
     * 
     * 这个状态必须是一个受击状态(movetype = H)且至少要有1帧.
     * 
     * 主要用于投掷.也可用于自定义攻击反应.
     * - 默认是-1,不改变.
     */
    p2stateno?: AttrValue;
    /**
     * 设置0防止P2获得P1(指定的)状态和动画数据,假如你不想使用"p2stateno"参数默认的特征
     * - 默认为1如果"p2stateno"参数被使用.否则被忽略.
     */
    p2getp1state?: AttrValue;
    /**
     * 设置1强制P2(原来处于蹲下状态)进入站立状态类型如果成功击中.如果P2在空中状态则无效.
     * - 通常默认为0,但如果"ground.velocity"中y_velocity参数是非0,则默认值是1.
     */
    forcestand?: AttrValue;
    /**
     * 设置1强制P2解除"fall"状态,如果他在这个状态内.如果P2不在"fall"状态内则此参数无效.
     * 
     * 如果"fall"参数是1则此参数被忽略.
     * - 缺省默认为0.
     */
    forcenofall?: AttrValue;
    /**
     * hit的识别号,用于招式连击.(连续攻击的招式)
     * 
     * 你能使用这个号码稍后检测玩家上一次是否被这个特定的HitDef击中.此号码被称为targetID.
     * 
     * 在TargetBind控制器或者在target(ID)重定向键值中被使用.
     * 
     * 有效值是所有大于等于1的整数
     * - 缺省默认为0(无ID).不要把TargetID与玩家ID混淆.
     */
    id?: AttrValue;
    /**
     * 主要用于一套连续招式中.
     * 
     * 如果P2上一次(最近一次)被P1且此ID的招式击中,则他只能被此chainID号的HitDef击中.你能把这些用于招式连击的下一部分.
     * 
     * 注意招式连击在没有使用"id"和"chainid"参数时仍可能有效.有效值是所有大于等于1的整数,
     * - 缺省默认为-1(连击任何招式).
     */
    chainID?: AttrValue;
    /**
     * nochainID指定2个在此次攻击中不能被连击的hit ID号.
     * 
     * 如果他们都是-1(默认值),则连击对任何hit ID号来说没有完全禁用.nochain_2能被省略.
     * 
     * 除了-1,指定的值不能与chainID的值吻合.
     * 
     * 如果P2被P1上一HitDef和当前HitDef之中的第三方击中则此参数无效.
     */
    nochainID?: [AttrValue, AttrValue];
    /**
     * 如果设置为1,此HitDef只作用于一个对手.如果成功击中,所有其他的目标将丢失.
     * 
     * 通常默认为0.异常情况是如果"attr"参数是投掷类型,将使它的默认值变成1.
     * 
     * (也就是说T属性的投掷攻击只能同时击中1个人,除非你用非T属性的投掷攻击)
     */
    hitonce?: AttrValue;
    /**
     * 设置此值为0能阻止此次攻击KO对手,当成功击中的时候.
     * - 默认是1.
     */
    kill?: AttrValue;
    /**
     * hit_count指示此hitdef应该加到combo counter(连击数)上的hits数目(也就是改动连击数).必须大于等于0.
     * - 默认是1.
     */
    numhits?: AttrValue;
    /**
     * p1power指定给予P1的能量值如果此HitDef成功击中.
     * 
     * p1gpower指定给予P1的能量值如果此HitDef被防住.
     * 
     * 如果缺省,p1power默认是hit_damage("damage"中的参数)乘以Default.Attack.LifeToPowerMul(data/mugen.cfg中指定的值).
     * 
     * 如果p1gpower缺省,默认值指定为p1power除以2.
     */
    getpower?: [AttrValue, AttrValue];
    /**
     * p2power指定给予P2的能量值如果此HitDef成功击中.
     * 
     * p2gpower指定给予P2的能量值如果此HitDef被防住.
     * 
     * 如果缺省,p2power默认是hit_damage("damage"中的参数)乘以Default.GetHit.LifeToPowerMul(data/mugen.cfg中指定的值).
     * 
     * 如果p2gpower缺省,默认值指定为p2power除以2.
     */
    givepower?: [AttrValue, AttrValue];
    /**
     * 如果包含这些参数,将能够实现P2的色表效果,如果成功击中的话.
     * 
     * palfx_time是提供给P2色表效果的时间(游戏帧数表示).palfx_time默认是0.(无效果)
     * 
     * 其余的参数和PalFX控制器中一样.
     */
    palfx?: {
        time?: AttrValue;
        mul?: [AttrValue, AttrValue, AttrValue];
        add?: [AttrValue, AttrValue, AttrValue];
    };
    /**
     * 如果包含这些参数,将在成功击中时使屏幕震动.
     * 
     * envshake_time是屏幕震动的时间.(游戏帧数表示)
     * 
     * 其余参数和EnvShake控制器中一样.
     */
    envshake?: EnvshakeType;
    guard?: {
        /**
         * 如果hit被防御住显示的火花动作号.
         * 
         * 要播放玩家的.air文件之外的火花(fightfx),在动作号前面加上S.
         * - 缺省默认为玩家变量中设置的值.(在cns文件[Data]组下面)
         */
        sparkno?: AttrValue;
        /**
         * 同"pausetime"参数相似,如果攻击被防御住,这参数是使每个玩家停止的时间.
         * - 缺省默认和"pausetime"参数值相同.
         */
        pausetime?: [AttrValue, AttrValue];
        /**
         * 同"ground.slidetime"相同,但这个值是P2防御住攻击时的.
         * - 默认值和"ground.slidetime"一样.
         */
        slidetime?: AttrValue;
        /**
         * 同"ground.hittime"相同,但这个值是P2防御住攻击时的.
         * - 默认值和"ground.hittime"一样.
         */
        hittime?: AttrValue;
        /**
         * P2在地面防御状态中恢复控制之前的时间.
         * - 缺省默认为"guard.slidetime"的值.
         */
        ctrltime?: AttrValue;
        /**
         * 距P1的x方向距离.在此距离中如果P2向P1反方向运动就会进入防御状态.
         * 
         * (主要用于远程攻击,不设置此参数对手无法防御,因为超出了防御距离或者用于近程投掷攻击,一般设置guard.dist=0使对手做不出防御动作)
         * - 缺省默认为玩家变量中设置的值.(在cns文件[Size]组下面)通常你不需要使用这个参数.
         */
        dist?: AttrValue;
        /**
         * 给予P2的速度,如果P2在地面上防御住了攻击.
         * - 缺省默认值是"ground.velocity"中x_velocity参数.
         */
        velocity: [AttrValue, AttrValue];
        cornerpush?: {
            /**
             * 确定给予玩家的额外速度(速度偏移量)如果他在版边的攻击被对手防御住.
             * 
             * 此数值设置的越高将导致玩家反弹离版边更远.
             * - 缺省默认值是ground.cornerpush.veloff.
             */
            veloff?: AttrValue;
        };
        /**
         * 设置此值为0能阻止此次攻击KO对手,当攻击被防御住的时候.
         * - 默认是1.(类似kill)
         */
        kill?: AttrValue;
    };
    ground?: {
        /**
         * 如果P2在地面上的攻击类型.选择如下:
         * 
         * - "High": 攻击使对手头向后移. 
         * - "Low": 击中对手腹部.
         * - "Trip": 扫腿攻击.(一般蹲下重脚就是这种)
         * - "None": 攻击除了在pausetime参数指定的时间内使P1和P2停顿外没有任何效果.
         * 
         * 如果使用"Trip"类型,则ground.velocity参数y方向速度应非0,且fall参数应该设置为1.
         * 
         * 对手如果被绊倒,将不会通过反弹下落到地面.(也就是说不会落地后弹起再落地)
         * 
         * 如果P2被从后方攻击,"High"将被当成"Low"显示,反之亦然.
         * 
         * 如果AnimType参数是"Back",则P2的"High","Low"类型动画将被替代.
         * - 缺省默认是"High".
         */
        type?: P2AttackType;
        /**
         * 这是P2被击中后向后滑动的时间(游戏帧数).(这时间不包括p2的pausetime)
         * 
         * 应用于使P2保持在地面上的hit.
         * - 缺省默认为0.
         */
        slidetime?: AttrValue;
        /**
         * P2被击中后停留在受击状态的时间.请小心调整此参数值使得有可能连击.
         * 
         * 应用于使P2保持在地面上的hit.
         * - 缺省默认为0.
         */
        hittime?: AttrValue;
        /**
         * P2被击中后的初始速度,如果P2在地面上.如果y_velocity非0,P2将被打致空中.
         * - 缺省默认都是0.如果想让P2保持在地面上你可以缺省y_velocity.
         */
        velocity: [AttrValue, AttrValue];
        cornerpush?: {
            /**
             * 确定给予玩家的额外速度(速度偏移量)如果他在地面版边攻击.
             * 
             * (也就是版边攻击会使自己后退的速度)
             * 
             * 此数值设置的越高将导致玩家反弹离版边更远.
             * - 缺省默认值取决于attr参数.如果attr中arg1是"A",默认是0.
             * - 否则,默认值是1.3*guard.velocity.
             */
            veloff?: AttrValue;
        };
    };
    air?: {
        /**
         * P2在空中时的攻击种类.
         * - 缺省默认和"ground.type"的值一样.
         */
        type?: P2AttackType;
        /**
         * 同"animtype"参数相似,此动画类型设置的是P2在空中而不是地面.
         * - 缺省默认值和"animtype"参数相同.
         */
        animtype?: AnimType;
        /**
         * P2被击中(在空中被击中或者击飞致空中,又能防御之前)后停留在hit状态的时间.
         * 
         * 如果"fall"参数设置为1则此参数无效.
         * - 缺省默认为20.
         */
        hittime?: AttrValue;
        /**
         * 给予P2的初始速度,如果P2在空中被击中.
         * - 缺省默认是0,0.
         */
        velocity: [AttrValue, AttrValue];
        cornerpush?: {
            /**
             * 确定给予玩家的额外速度(速度偏移量)如果他在版边攻击空中的对手.
             * 
             * 此数值设置的越高将导致玩家反弹离版边更远.
             * - 缺省默认值是ground.cornerpush.veloff.
             */
            veloff?: AttrValue;
        };
        /**
         * hit要求的额外连击点数.不要与StateDef中的"juggle"参数混淆.
         * 
         * 你通常不需要使用这个参数,除了HitDef中的飞行道具.
         * - 缺省默认值是0.
         */
        juggle?: AttrValue;
        /**
         * 设置1如果你想让P2进入"fall"状态,如果hit发生时P2在空中.(P2着地前不恢复控制)
         * - 默认和fall的值相同.
         */
        fall?: AttrValue;
    };
    airguard?: {
        /**
         * 给予P2的速度,如果P2在空中防御住攻击.
         * - 默认值是x_velocity * 1.5, y_velocity / 2,这里的 x_velocity和y_velocity是"air.velocity"参数的值.
         */
        velocity: [AttrValue, AttrValue];
        cornerpush?: {
            /**
             * 确定给予玩家的额外速度(速度偏移量)如果他在版边的攻击被对手空中防御住.
             * 
             * 此数值设置的越高将导致玩家反弹离版边更远.
             * - 缺省默认值是guard.cornerpush.veloff.
             */
            veloff?: AttrValue;
        };
        /**
         * P2在空防状态恢复控制前的时间.
         * - 缺省默认为"guard.ctrltime"的值.
         */
        ctrltime?: AttrValue;
    };
    down?: {
        /**
         * 当P2倒地被攻击时指定给P2的速度.如果y_velocity非0,P2将被打飞.
         * 
         * 如果是0,则P2将在地面上向后滑动.
         * - 缺省默认和"air.velocity"参数值相同.
         */
        velocity?: [AttrValue, AttrValue];
        cornerpush?: {
            /**
             * 确定给予玩家的额外速度(速度偏移量)如果他在版边攻击蹲下的对手.
             * 
             * 此数值设置的越高将导致玩家反弹离版边更远.
             * - 缺省默认值是ground.cornerpush.veloff.
             */
            veloff?: AttrValue;
        };
        /**
         * 当P2倒地被攻击时将向后滑动的时间.
         * - 此参数将被忽略如果"down.velocity"参数中的y_velocity非0.
         */
        hittime?: AttrValue;
        /**
         * 设置为1如果你想让P2在撞击地面后立刻从地面反弹起来.(使用 fall.xvelocity和fall.yvelocity参数值)
         * 
         * 如果"down.velocity"中y_velocity参数为0则此参数被忽略.
         * - 缺省默认为0.(P2撞击地面不反弹)
         */
        bounce?: AttrValue;
    };
    /**
     * 设置1如果你想让P2进入"fall(下落)"状态.(P2着地前不恢复控制)
     * 
     * 如果你想用一招"击倒"P2就是用他.
     * - 默认是0.
     */
    Fall?: AttrValue;
    fall?: {
        /**
         * 同"animtype"参数相似,此动画类型设置P2在下落时被击中.
         * - 如果air.animtype是Up则fall.animtype默认是Up否则是Back.
         */
        animtype?: AnimType;
        /**
         * 当处于"fall"状态从地面反弹时P2获得的x方向速度.
         * - 缺省默认为不变.
         */
        xvelocity?: AttrValue;
        /**
         * 当处于"fall"状态从地面反弹时P2获得的y方向速度.
         * - 默认 -4.5(240p), -9(480p), -18(720p).
         */
        yvelocity?: AttrValue;
        /**
         * 设置为0如果你不想让P2在"fall"状态中能够恢复.
         * - 缺省默认为1.(可以恢复)
         */
        recover?: AttrValue;
        /**
         * 在P2通过输入恢复指令,能够从"fall"状态恢复之前必须经过的时间.
         * 
         * 不包含P2被停止(攻击中引起的震动)的时间.
         * - 缺省默认为4.
         */
        recovertime?: AttrValue;
        /**
         * 指示当P2在下落状态之外撞击地面造成的伤害值.
         * - 缺省默认为0.
         */
        damage?: AttrValue;
        /**
         * 设置为0阻止这次攻击KO对手,当他落在地上的时候.(见fall.damage).
         * - 默认为1.
         */
        kill?: AttrValue;
        /**
         * 和envshake.*参数相似,只是仅当P2撞击地面时才有效果.
         */
        envshake?: EnvshakeType;
    };
}

/**
 * HitDef 
 * 
 * 定义玩家攻击中的单个hit(属性).
 * 
 * 如果玩家的Clsn1框(即红框/攻击框)与对手的Clsn2框(即兰框/受击框)接触,且HitDef被定义在这个特定时间点或之前,则将应用指定的效果.
 * 
 * 这是一个较复杂的,但是最常用的控制器.单个HitDef仅对单个hit有效.
 * 
 * 要使一个招式产生多次hit,你必须在攻击中触发多个HitDef.
 * 
 * ---
 * **注意：**
 * 
 * **当在一个[Statedef -2]块中被执行同时此玩家又(执行)另一个玩家的状态和动画数据时HitDef的特征是未定义的.**
 * 
 * **(比如在[Statedef -2]中执行HitDef同时你进入了对手指定的状态,p2stateno,targetstate这种)**
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
    /**
     * 给此飞行道具指定ID号.
     * - 设置为正数.
     */
    ProjID?: AttrValue;
    /**
     * 指定飞行道具使用的动画动作号.
     * - 缺省默认是0.
     */
    projanim?: AttrValue;
    /**
     * 指定飞行道具击中对手时的动画号.
     * - 缺省默认为-1(不改变原有动画).
     */
    projhitanim?: AttrValue;
    /**
     * 指定飞行道具被移除时的动画号(由于时间过期或者到达了它的移动边界,等等).
     * - 缺省默认为projhitanim的值.
     */
    projremanim?: AttrValue;
    /**
     * 指定飞行道具被另一个飞行道具削去时的动画.
     * - 缺省默认为projremanim的值.
     */
    projcancelanim?: AttrValue;
    /**
     * 指定飞行道具的缩放系数.最终飞行道具的缩放效果被此参数和P1cns文件[Size]组中"proj.doscale"共同影响.
     * - 缺省默认为1,1(正常尺寸).
     */
    projscale?: [AttrValue, AttrValue];
    /**
     * 设置非0值使飞行道具在击中后移除,或者设置0阻止这个特征.
     * - 默认是1.
     */
    projremove?: AttrValue;
    /**
     * 指定飞行道具在屏幕中将要被移除的时间帧数.(也就是remove_time后飞行道具被移除,相对于生命周期)
     * 
     * 如果是-1,飞行道具将不会被移除.
     * - 默认是-1.
     */
    projremovetime?: AttrValue;
    /**
     * 指定飞行道具x和y方向的速度初始值.
     * - 缺省默认是0,0.
     */
    velocity?: [AttrValue, AttrValue];
    /**
     * 指定当飞行道具被移除时x和y方向的速度.
     * - 缺省默认为0,0.
     */
    remvelocity?: [AttrValue, AttrValue];
    /**
     * 指定飞行道具x和y方向的加速度.
     * - 缺省默认为0,0.
     */
    accel?: [AttrValue, AttrValue];
    /**
     * 指定x和y方向速度的乘数.飞行道具的速度每帧都会乘以这个乘数.
     * - 缺省默认为1,1.
     */
    velmul?: [AttrValue, AttrValue];
    /**
     * 指定飞行道具在被移除前能给予对手的hit数.
     * - 默认是1.
     */
    projhits?: AttrValue;
    /**
     * 如果飞行道具设定了多次hit,miss_time指定了飞行道具hit的时间间隔帧数.
     * - 默认为0.
     */
    projmisstime?: AttrValue;
    /**
     * 指定飞行道具的优先级.(俗称波的等级)
     * 
     * 如果飞行道具与另一个相同优先级的飞行道具碰撞,他们将一起被削去.
     * 
     * 如果与低优先级的飞行道具碰撞,将会削去低优先级的飞行道具,且那个高优先级的飞行道具,他的优先级将减去1.
     * - 默认为1.(与hitdef中攻击优先级定义(priority)不同,飞行道具的优先级没有指定范围)
     */
    projpriority?: AttrValue;
    /**
     * 指定飞行道具图像的优先级.高优先级图像会显示在低优先级图像上方.
     * - 默认是3.
     */
    projsprpriority?: AttrValue;
    /**
     * 指定飞行道具被自动移除前远离屏幕边缘的距离.单位是像素.
     * - 默认为40(240p),80(480p),160(720p).
     */
    projedgebound?: AttrValue;
    /**
     * 指定飞行道具被自动移除前远离舞台边缘的最大距离.
     * - 默认为40(240p),80(480p),160(720p).
     */
    projstagebound?: AttrValue;
    /**
     * projheightbound = lowbound, highbound (整型, 整型) 
     * 
     * 指定飞行道具能够到达的y方向坐标最大最小值.
     * 
     * 如果飞行道具离开这个边界,将会自动移除.
     * 
     * ---
     * **注意：**
     * 
     * **因为减少y值会增加在屏幕上的高度,所以边界值下限实际指定的是飞行道具能到达的最高高度.**
     * 
     * **边界值下限默认为-240(240p), -480(480p), -960(720p).边界值上限默认是1(240p), 2(480p), 4(720p).**
     */
    projheightbound?: [AttrValue, AttrValue];
    /**
     * 指定飞行道具被创建时x和y方向的偏移量.
     * 
     * 飞行道具创建时的朝向总是和玩家一样.
     * 
     * off_x与飞行道具所面对的方向有关.
     * 
     * offset的确切特征取决于postype.
     * - 缺省默认都为0.
     */
    offset?: [AttrValue, AttrValue];
    /**
     * 指定了postype(位置类型)--如何解读相关位置的参数.
     * - 所有情况下,正的y偏移量表示向下的位移.
     * - 所有情况下,off_y相对于玩家的位置.
     */
    postype?: BasePostype;
    /**
     * 如果shadow非零值,将绘制飞行道具火花的阴影,否则不会.
     * - 默认是0.
     * 
     * ---
     * 指定飞行道具影子的R,G,B数值分量.分量值应是[0,255]之间的整数.
     * 
     * 如果shad_r计算出-1,则将使用舞台的影子颜色.
     * 
     * 分量值越大,这种颜色在影子中显示的越少.所以纯黑色的影子是255,255,255.
     * 
     * - 默认为0,0,0.(没影子)
     */
    projshadow?: AttrValue | [AttrValue, AttrValue, AttrValue];
    /**
     * 指定SuperPause(超级暂停)中飞行道具将不被冻结住的时间帧数.
     * - 默认为0.
     */
    supermovetime?: AttrValue;
    /**
     * 指定Pause(暂停)中飞行道具将不被冻结住的时间帧数.
     * - 默认为0.
     */
    pausemovetime?: AttrValue;
    /**
     * - 如果ownpal_flag为0,飞行道具颜色将被随后执行的自身的PalFX和RemapPal控制器影响.通常情况下这是默认值.
     * - 如果ownpal_flag为1,飞行道具颜色将不会被随后执行的自身的PalFX和RemapPal控制器影响.如果是从fightfx.air播放动画的,这是默认值.
     */
    ownpal?: AttrValue;
    /**
     * 强制色表从飞行道具索引颜色图像重映射到指定的色表.
     * 
     * 此参数仅当ownpal_flag为非0.
     * 
     * 如果dst_pal_grp是-1,此参数将被忽略.
     * - 默认-1,0.
     */
    remappal?: [AttrValue, AttrValue];
    /**
     * 如果包含这些数值,将实现飞行道具的残影效果.
     * 
     * 参数与AfterImage控制器中的一样
     */
    afterimage?: Omit<AfterImageParams, keyof BaseSctrls>;
}

/**
 * Projectile 
 * 
 * 为玩家创建一个飞行道具.
 * 
 * Projectile控制器携带了HitDef控制器的所有参数,用来控制飞行道具的HitDef.
 * 
 * ---
 * 注：projectile俗称"波""飞弹"等等,这里统一译作"飞行道具".HitDef直译为"击中定义".
 * 
 * ---
 * **注意：**
 * 
 * **helper创建的飞行道具将立刻被他的根级所有.**
 * 
 * **当在一个[Statedef -2]块中被执行同时此玩家有(执行)另一个玩家的状态和动画数据时飞行道具的HitDef特征是未定义的.**
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