import { Null, AfterImage, useStatedef, ChangeState, createTriggers, Or, useTriggers, And, Bracket } from '@tsmugen/core';
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
    })
    
    ChangeState({
        triggers: createTriggers({
            1: And(
                Abs(time.add(100)).less(100),
                anim.notEqual(0)
            ),
            2: And(
                Abs(root.Helper(1000).var(100).sub(7)).over(20),
                Bracket(root.singleGlasses.initVelX),
                player1.AISwitch,
                enemyFarthest.AILevel
            ),
            3: And(
                player1.Helper(4000).var(22),
                enemyFarthest.AISwitch.add(7).equal(7)
            )
        }),
        value: 0,
        ctrl: 1
    });
};
export default [letsStart, state2];