import { Null, AfterImage, useStatedef, ChangeState, createTriggers, Or, useTriggers, And, Bracket } from '@tsmugen/core';
import { singleGlasses } from '../helpers';
import { enemyFarthest, player1 } from '../players';

const letsStart = () => {
    useStatedef({
        id: 1000,
        describe: '测试',
        type: 'S',
        sprpriority: 0,
        movetype: 'A',
        physics: 'N',
        anim: 2000
    });

    AfterImage({
        triggers: time.equal(0),
        time: 10
    });

    Null({
        triggers: root.time.equal(0),
        describe: 'Hello World'
    });
};

const state2 = () => {
    useStatedef({
        id: 1500,
        describe: '测试',
        type: 'S',
        movetype: 'A',
        physics: 'N',
        anim: 2000
    });

    root.Helper(1000).Create({
        triggers: time.equal(0),
        stateno: 2000
    });

    ChangeState({
        triggers: createTriggers({
            All: NumHelper(singleGlasses),
            1: And(
                Abs(time.add(100)).less(100),
                anim.notEqual(0)
            ),
            2: And(
                Abs(root.Helper(1000).time.sub(7)).over(20),
                Bracket(root.singleGlassesRoot.moveType.equal('H')),
                root.numHelper(root.singleGlassesRoot.id),
                player1.AISwitch,
                enemyFarthest.AILevel
            ),
            3: And(
                player1.Helper(4000).var(22),
                enemyFarthest.AISwitch.add(7).equal(7),
                singleGlasses.inGuardDist,
                singleGlasses.initVelX
            ),
            4: And(
                enemynear.singleGlassesEnemynear.AILevel,
                enemynear.singleGlassesEnemynear.initVelY
            ),
            5: `${time} * ${singleGlasses.velX} = 100`
        }),
        value: 0,
        ctrl: 1
    });
};
export default [letsStart, state2];