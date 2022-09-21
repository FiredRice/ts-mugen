; 汉化版功夫人的cmd文件
;
; 两部分:按键定义和state入口（就是按什么键进入什么state。原谅我吧……想不出好名字了）
; (state入口在按键定义之后)
;
; 1. 按键定义
; ---------------------
; 注意: 按键和招式名分大小写。
; 八个方向分别是:
;   B, DB, D, DF, F, UF, U, UB     (全大写)
;   对应后，下后，下，下前，前，前上，上，上后。
; 六个按键是:
;   a, b, c, x, y, z               (全小写)
;   在默认按键的情况下，xyz在上排，abc在下排。
;   推荐使用xyz作为拳，abc作为脚。
;
; 每一个[Command]定义一个操作指令。
; 这些操作指令可以在cmd和cns里被调用。
; 操作指令的语法规范如下:
;
;   [Command]
;   name = "指令名"
;   command = 按键输入
;   time = 接受指令输入的时间 (可选)
;   buffer.time = 输入缓存的时间 (可选)
;
; - 指令名
;   指令的名字，在调用时需要输入同样的名字，比如trigger1=command="指令名"。
;   指令名区分大小写。(QCB_a和Qcb_a或者QCB_A不同)。
;
; - 按键输入
;   输入的按键的列表。每一个键由逗号隔开。一个方向键或者一个攻击键叫为一个符号。
;   方向键和攻击键之前可以用特殊符号来达到一些效果:
;   斜杠 (/) - 表示之后的一个键必须被按住不放
;          举例, command = /D       ;按住不放下方向键
;               command = /DB, a   ;按住不放下后方向键的时候按a
;   波浪号 (~) - 表示按键被松开
;          举例, command = ~a       ;松开a键
;               command = ~D, F, a ;松开下方向键，按前方向键，再按a
;          如果你想让某个键蓄力一段时间再放开，可以再波浪号之后加入你想保持蓄力的时间(以帧为单位)
;          举例, command = ~30a     ;按住a30帧，再松开
;   美金 ($) - 仅限上下左右方向键。表示包括正和斜方向
;          举例, command = $D       ;包括下，下后和下前
;               command = $B       ;包括后，下后和上后
;   加号 (+) - 仅限攻击键。表示同时按多个键。
;          举例, command = a+b      ;同时按a和b
;               command = x+y+z    ;同时按x，y和z
;   大于号 (>) - 表示上一次按键和这一次按键之中不能掺杂其他的按键
;          举例, command = a, >~a   ;按下a再松开a，而其中不按下或者松开其他键
;   这些符号可以组合使用:
;     举例, command = ~30$D, a+b     ;按住下，下后或者下前30帧，松开，然后同时按a和b
;
;   注意: 连续按方向键的指令会被MUGEN引擎自动理解如下:
;         举例，cmd文件中的定义:
;           command = F, F
;         会被引擎理解成:
;           command = F, >~F, >F
;
;   对于有多个方向键的定义，例如四分之一圈下前，为了让招数能更容易的使出，最好在定义由一个"松开方向键"起始。
;
; - 指令输入时间 (可选)
;   接受指令输入的时间，以帧为单位。默认值可以在[Defaults]条目修改，通常为15。
;
; - 指令缓存时间 (可选)
;   输入的指令被缓存的时间。当一个指令被输入时，它在这段时间里都是有效的。
;   最基本的情况是设置成值为1。这种情况下只有在这一帧输入指令才会执行。如果值更高，比如3或4，输入会提前进入缓存，然后当可以执行时就被执行。这样人物的操作会松快一些，因为玩家可以提前输入指令，比如在还没有击中敌人时就开始取消，或者从受击状态还没有获得控制时就切反。
;   但这也有副作用，因为在缓存的期间会认为一直在输入这个指令。举例来说，把这个值设成30，然后发一个很快的招式，比如功夫人的站轻拳，看它的效果。
;   默认值可以在[Defaults]条目修改。
;   这个参数对蓄力指令不起作用，参数的值会自动当作1。
;
; 如果有多种输入有同样的名子，每一种输入都会读出这个指令。你可以用这个技巧来让一个招式接受不同的输入。
;
; 以下是一些常用指令的输入示例:
;
; [Command] ;下前 + x
; name = "下前x"
; command = ~D, DF, F, x
;
; [Command] ;向后半圈 + a
; name = "后半圈a"
; command = ~F, DF, D, DB, B, a
;
; [Command] ;下前下前 + y
; name = "下前下前y"
; command = ~D, DF, F, D, DF, F, y
;
; [Command] ;连打b
; name = "连打b"
; command = b, b, b, b, b
; time = 30
;
; [Command] ;蓄后，前 + z
; name = "蓄后前z"
; command = ~60$B, F, z
; time = 10
;
; [Command] ;蓄下，上 + c
; name = "蓄下上c"
; command = ~60$D, U, c
; time = 10


;-| 重新排列按键 |-----------------------------------------------------
; 这一段可以让玩家简单的重新排列攻击按键。格式是:
;  以前对应的键 = 修改后的键
; 如果不填写修改后的键，则以前对应的键将失效。
[Remap]
x = x
y = y
z = z
a = a
b = b
c = c
s = s

;-| 默认输入时间 |-------------------------------------------------------
[Defaults]
; 默认接受指令的时间，最小为1。
command.time = 15

; 默认指令蓄力的时间，最小为1，最大为30。
command.buffer.time = 1


;-| 超必杀技 |--------------------------------------------------------
;下面有两个技能是一样的，但是输入不同。
;两种输入都会触发command = 三连功夫掌"。
;为了方便玩家操作，指令接受时间不是默认的15，而是20。
;
[Command]
name = "三连功夫掌"
command = ~D, DF, F, D, DF, F, x
time = 20

[Command]
name = "三连功夫掌"   ;名称同上
command = ~D, DF, F, D, DF, F, y
time = 20

[Command]
name = "破裂功夫升龙"
command = ~D, DB, B, D, DB, B, x
time = 20

[Command]
name = "破裂功夫升龙"   ;名称同上
command = ~D, DB, B, D, DB, B, y
time = 20

;-| 特殊技 |------------------------------------------------------
[Command]
name = "格挡"
command = $F,x
time = 3

[Command]
name = "格挡" ;名称同上 (输入顺序相反)
command = x,$F
time = 3

[Command]
name = "轻升龙"
command = ~F, D, DF, x

[Command]
name = "重升龙"
command = ~F, D, DF, y

[Command]
name = "疾风升龙"
command = ~F, D, DF, x+y

[Command]
name = "轻功夫掌"
command = ~D, DF, F, x

[Command]
name = "重功夫掌"
command = ~D, DF, F, y

[Command]
name = "疾风功夫掌"
command = ~D, DF, F, x+y

[Command]
name = "轻破"
command = ~D, DB, B, x

[Command]
name = "重破"
command = ~D, DB, B, y

[Command]
name = "疾风破"
command = ~D, DB, B, x+y

[Command]
name = "轻铁山靠"
command = ~D, DF, F, a

[Command]
name = "重铁山靠"
command = ~D, DF, F, b

[Command]
name = "疾风铁山靠"
command = ~D, DF, F, a+b

[Command]
name = "疾风腿"
command = F, F, a+b

[Command]
name = "轻腿"
command = F, F, a

[Command]
name = "重腿"
command = F, F, b

;-| 按两次 |-----------------------------------------------------------
[Command]
name = "FF"     ;必须包括 (不要删除)
command = F, F
time = 10

[Command]
name = "BB"     ;必须包括 (不要删除)
command = B, B
time = 10

[Command]
name = "前前"
command = F, F
time = 10

[Command]
name = "后后"
command = B, B
time = 10

;-| 同时按键 |-----------------------------------------------
[Command]
name = "recovery";必须包括 (不要删除)
command = x+y
time = 1

[Command]
name = "受身"
command = x+y
time = 1

;-| 方向＋攻击键 |---------------------------------------------------------
[Command]
name = "下+a"
command = /$D,a
time = 1

[Command]
name = "下+b"
command = /$D,b
time = 1

;-| 单攻击键 |---------------------------------------------------------
[Command]
name = "a"
command = a
time = 1

[Command]
name = "b"
command = b
time = 1

[Command]
name = "c"
command = c
time = 1

[Command]
name = "x"
command = x
time = 1

[Command]
name = "y"
command = y
time = 1

[Command]
name = "z"
command = z
time = 1

[Command]
name = "start"
command = s
time = 1

;-| 蓄方向键 |--------------------------------------------------------------
[Command]
name = "holdfwd";必须包括 (不要删除)
command = /$F
time = 1

[Command]
name = "holdback";必须包括 (不要删除)
command = /$B
time = 1

[Command]
name = "holdup" ;必须包括 (不要删除)
command = /$U
time = 1

[Command]
name = "holddown";必须包括 (不要删除)
command = /$D
time = 1

[Command]
name = "蓄上方向"
command = /$F
time = 1

[Command]
name = "蓄后方向"
command = /$B
time = 1

[Command]
name = "蓄前方向"
command = /$U
time = 1

[Command]
name = "蓄下方向"
command = /$D
time = 1

;---------------------------------------------------------------------------
; 2. state入口
; --------------
; 在这一段里，人物会依据输入来转到相应的state里。
;
; 入口示例如下:
;   [State -1, 标签]           ;标签可以是任意你想要来标注这个入口的名字
;   type = ChangeState          ;不要改
;   value = 要跳转到的state
;   trigger1 = command = "招式名"
;   . . .  (其他trigger)
;
; - 一些常用的trigger:
;   - statetype
;       S, C or A : 现在人物的状态 (站立, 下蹲, 空中)
;   - ctrl
;       0 or 1 : 如果人物可控，则值为1，否则为0。除非取消另一个招数，否则出招是一般要求ctrl=1
;   - stateno
;       现在人物的state号 - 在取消招数时常用。
;   - movecontact
;       0 or 1 : 如果上一个招数接触到了敌人，则值为1，否则为0。在取消招数时常用。
;
; 注意: 入口的顺序很重要。
;   如果指令A是指令B的一部分，则指令B的入口应排在指令A前。
;   比如说，下前下前XY应该排在下前XY之前，下前XY应该排在下前X之前，下前X应该排在X之前。
;
; 关于trigger的详细解释，请参阅MUGEN自带的cns参考说明。
;
; 提示:
; 这部分是cns的延伸。-1这个state是一个特殊state，无论人物实际上在哪个state，-1这个state每一帧都会执行。


; 不要删除下面这行。语法标准要求CMD文件必须包括这行。
[Statedef -1]

;===========================================================================
;---------------------------------------------------------------------------
;破裂功夫升龙 (耗一格能量)
[State -1, 破裂功夫升龙]
type = ChangeState
value = 3050
triggerall = command = "破裂功夫升龙"
triggerall = power >= 1000
triggerall = statetype != A
trigger1 = ctrl
trigger2 = hitdefattr = SC, NA, SA, HA
trigger2 = stateno != [3050,3100)
trigger2 = movecontact
trigger3 = stateno = 1310 || stateno = 1330 ;格挡后

;---------------------------------------------------------------------------
;三连功夫掌 (耗一格能量)
[State -1, 三连功夫掌]
type = ChangeState
value = 3000
triggerall = command = "三连功夫掌"
triggerall = power >= 1000
trigger1 = statetype = S
trigger1 = ctrl
trigger2 = statetype != A
trigger2 = hitdefattr = SC, NA, SA, HA
trigger2 = stateno != [3000,3050)
trigger2 = movecontact
trigger3 = stateno = 1310 || stateno = 1330 ;格挡后


;===========================================================================
;这个控制器不触发招数。如果人物可以从普通技取消到必杀技，这个控制器会把var(1)设置成1。下面必杀技的控制器会用到这个变量。
;Since a lot of special moves rely on the same conditions, this reduces
;redundant logic.
[State -1, 变量清零]
type = VarSet
trigger1 = 1
var(1) = 0

[State -1, 检查可否取消]
type = VarSet
trigger1 = statetype != A
trigger1 = ctrl
trigger2 = (stateno = [200,299]) || (stateno = [400,499])
trigger2 = stateno != 440 ;蹲重脚例外
trigger2 = movecontact
trigger3 = stateno = 1310 || stateno = 1330 ;格挡后
var(1) = 1

;---------------------------------------------------------------------------
;疾风功夫腿 (耗三分之一格能量)
[State -1, 疾风功夫腿]
type = ChangeState
value = 1070
triggerall = command = "疾风腿"
triggerall = power >= 330
trigger1 = var(1) ;在可以取消时

;---------------------------------------------------------------------------
;轻功夫腿
[State -1, 轻功夫腿]
type = ChangeState
value = 1050
triggerall = command = "轻腿"
trigger1 = var(1) ;在可以取消时

;---------------------------------------------------------------------------
;重功夫腿
[State -1, 重功夫腿]
type = ChangeState
value = 1060
triggerall = command = "重腿"
trigger1 = var(1) ;在可以取消时

;---------------------------------------------------------------------------
;疾风功夫掌 (耗三分之一格能量)
[State -1, 疾风功夫掌]
type = ChangeState
value = 1020
triggerall = command = "疾风功夫掌"
triggerall = power >= 330
trigger1 = var(1) ;在可以取消时

;---------------------------------------------------------------------------
;轻功夫掌
[State -1, 轻功夫掌]
type = ChangeState
value = 1000
triggerall = command = "轻功夫掌"
trigger1 = var(1) ;在可以取消时

;---------------------------------------------------------------------------
;重功夫掌
[State -1, 重功夫掌]
type = ChangeState
value = 1010
triggerall = command = "重功夫掌"
trigger1 = var(1) ;在可以取消时

;---------------------------------------------------------------------------
;疾风功夫升龙 (耗三分之一格能量)
[State -1, 疾风功夫升龙]
type = ChangeState
value = 1120
triggerall = command = "疾风升龙"
triggerall = power >= 330
trigger1 = var(1) ;在可以取消时

;---------------------------------------------------------------------------
;轻功夫升龙
[State -1, 轻功夫升龙]
type = ChangeState
value = 1100
triggerall = command = "轻升龙"
trigger1 = var(1) ;在可以取消时

;---------------------------------------------------------------------------
;重功夫升龙
[State -1, 重功夫升龙]
type = ChangeState
value = 1110
triggerall = command = "重升龙"
trigger1 = var(1) ;在可以取消时

;---------------------------------------------------------------------------
;疾风功夫破 (耗三分之一格能量)
[State -1, 疾风功夫破]
type = ChangeState
value = 1220
triggerall = command = "疾风破"
triggerall = power >= 330
trigger1 = var(1) ;在可以取消时

;---------------------------------------------------------------------------
;轻功夫破
[State -1, 轻功夫破]
type = ChangeState
value = 1200
triggerall = command = "轻破"
trigger1 = var(1) ;在可以取消时

;---------------------------------------------------------------------------
;重功夫破
[State -1, 重功夫破]
type = ChangeState
value = 1210
triggerall = command = "重破"
trigger1 = var(1) ;在可以取消时

;---------------------------------------------------------------------------
;功夫格挡 (High)
[State -1, 上段功夫格挡]
type = ChangeState
value = 1300
triggerall = command = "格挡"
triggerall = command != "蓄下方向"
trigger1 = ctrl
trigger1 = statetype != A
trigger2 = stateno = 1310 || stateno = 1330
trigger2 = time > 0

;---------------------------------------------------------------------------
;功夫格挡格挡 (下段)
[State -1, 下段功夫格挡]
type = ChangeState
value = 1320
triggerall = command = "格挡"
triggerall = command = "蓄下方向"
trigger1 = ctrl
trigger1 = statetype != A
trigger2 = stateno = 1310 || stateno = 1330
trigger2 = time > 0

;---------------------------------------------------------------------------
;功夫格挡 (空中)
[State -1, 空中功夫格挡]
type = ChangeState
value = 1340
triggerall = command = "格挡"
triggerall = command != "蓄前方向"
triggerall = command != "蓄下方向"
trigger1 = ctrl
trigger1 = statetype = A
trigger2 = stateno = 1350
trigger2 = time > 0

;---------------------------------------------------------------------------
;疾风功夫铁山靠
[State -1, 疾风功夫铁山靠]
type = ChangeState
value = 1420
triggerall = command = "疾风铁山靠"
triggerall = power >= 330
trigger1 = var(1) ;在可以取消时

;---------------------------------------------------------------------------
;轻功夫铁山靠
[State -1, 轻功夫铁山靠]
type = ChangeState
value = 1400
triggerall = command = "轻铁山靠"
trigger1 = var(1) ;在可以取消时

;---------------------------------------------------------------------------
;重功夫铁山靠
[State -1, 重功夫铁山靠]
type = ChangeState
value = 1410
triggerall = command = "重铁山靠"
trigger1 = var(1) ;在可以取消时

;===========================================================================
;---------------------------------------------------------------------------
;前跑
[State -1, 前跑]
type = ChangeState
value = 100
trigger1 = command = "前前"
trigger1 = statetype = S
trigger1 = ctrl

;---------------------------------------------------------------------------
;后跑
[State -1, 后跑]
type = ChangeState
value = 105
trigger1 = command = "后后"
trigger1 = statetype = S
trigger1 = ctrl

;---------------------------------------------------------------------------
;功夫投
[State -1, 功夫投]
type = ChangeState
value = 800
triggerall = command = "y"
triggerall = statetype = S
triggerall = ctrl
triggerall = stateno != 100
trigger1 = command = "蓄上方向"
trigger1 = p2bodydist X < 3
trigger1 = (p2statetype = S) || (p2statetype = C)
trigger1 = p2movetype != H
trigger2 = command = "蓄后方向"
trigger2 = p2bodydist X < 5
trigger2 = (p2statetype = S) || (p2statetype = C)
trigger2 = p2movetype != H



;===========================================================================
;---------------------------------------------------------------------------
;立轻拳
[State -1, 立轻拳]
type = ChangeState
value = 200
triggerall = command = "x"
triggerall = command != "蓄下方向"
trigger1 = statetype = S
trigger1 = ctrl
trigger2 = stateno = 200
trigger2 = time > 6

;---------------------------------------------------------------------------
;立重拳
[State -1, 立重拳]
type = ChangeState
value = 210
triggerall = command = "y"
triggerall = command != "蓄下方向"
trigger1 = statetype = S
trigger1 = ctrl
trigger2 = (stateno = 200) && time > 5
trigger3 = (stateno = 230) && time > 6

;---------------------------------------------------------------------------
;立轻脚
[State -1, 立轻脚]
type = ChangeState
value = 230
triggerall = command = "a"
triggerall = command != "蓄下方向"
trigger1 = statetype = S
trigger1 = ctrl
trigger2 = (stateno = 200) && time > 7
trigger3 = (stateno = 230) && time > 9

;---------------------------------------------------------------------------
;立重脚
[State -1, 立重脚]
type = ChangeState
value = 240
triggerall = command = "b"
triggerall = command != "蓄下方向"
trigger1 = statetype = S
trigger1 = ctrl
trigger2 = (stateno = 200) && time > 5
trigger3 = (stateno = 230) && time > 6

;---------------------------------------------------------------------------
;挑拨
[State -1, 挑拨]
type = ChangeState
value = 195
triggerall = command = "start"
trigger1 = statetype != A
trigger1 = ctrl

;---------------------------------------------------------------------------
;蹲轻拳
[State -1, 蹲轻拳]
type = ChangeState
value = 400
triggerall = command = "x"
triggerall = command = "蓄下方向"
trigger1 = statetype = C
trigger1 = ctrl

;---------------------------------------------------------------------------
;蹲重拳
[State -1, 蹲重拳]
type = ChangeState
value = 410
triggerall = command = "y"
triggerall = command = "蓄下方向"
trigger1 = statetype = C
trigger1 = ctrl
trigger2 = (stateno = 400) || (stateno = 430)
trigger2 = (time > 9) || (movecontact && time > 5)

;---------------------------------------------------------------------------
;蹲轻脚
[State -1, 蹲轻脚]
type = ChangeState
value = 430
triggerall = command = "a"
triggerall = command = "蓄下方向"
trigger1 = statetype = C
trigger1 = ctrl
trigger2 = (stateno = 400) || (stateno = 430)
trigger2 = (time > 9) || (movecontact && time > 5)

;---------------------------------------------------------------------------
;蹲重脚
[State -1, 蹲重脚]
type = ChangeState
value = 440
triggerall = command = "b"
triggerall = command = "蓄下方向"
trigger1 = statetype = C
trigger1 = ctrl
trigger2 = (stateno = 400) || (stateno = 430)
trigger2 = (time > 9) || (movecontact && time > 5)

;---------------------------------------------------------------------------
;跳轻拳
[State -1, 跳轻拳]
type = ChangeState
value = 600
triggerall = command = "x"
trigger1 = statetype = A
trigger1 = ctrl
trigger2 = stateno = 600
trigger2 = statetime >= 7
trigger3 = stateno = 1350 ;空中格挡后

;---------------------------------------------------------------------------
;跳重拳
[State -1, 跳重拳]
type = ChangeState
value = 610
triggerall = command = "y"
trigger1 = statetype = A
trigger1 = ctrl
trigger2 = stateno = 600 || stateno = 630 ;跳轻拳或者跳轻脚后
trigger2 = movecontact
trigger3 = stateno = 1350 ;空中格挡后

;---------------------------------------------------------------------------
;跳轻脚
[State -1, 跳轻脚]
type = ChangeState
value = 630
triggerall = command = "a"
trigger1 = statetype = A
trigger1 = ctrl
trigger2 = stateno = 1350 ;空中格挡后

;---------------------------------------------------------------------------
;跳重脚
[State -1, 跳重脚]
type = ChangeState
value = 640
triggerall = command = "b"
trigger1 = statetype = A
trigger1 = ctrl
trigger2 = stateno = 600 || stateno = 630 ;jump_x or jump_a
trigger2 = movecontact
trigger3 = stateno = 1350 ;空中格挡后
