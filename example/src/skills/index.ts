import { Null, AfterImage, useStatedef, ChangeState, createTriggers, Or, useTriggers, And } from '@tsmugen/core';
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

    Null({
        triggers: createTriggers({
            All: NumHelper(),
            1: time.notEqual(0),
            2: Or(
                root.singleGlasses.alive,
                enemyFarthest.AISwitch.between(0, 10),
                player1.singleGlasses.initVelX.add(10).equal(5)
            )
        }),
        describe: 'Hello World2'
    });

    // const triggers = useTriggers();
    // triggers.append(
    //     Abs(time.add(100)).less(100),
    //     anim.notEqual(0)
    // )
    // triggers.append(
    //     anim.equal(0),
    //     time.equal(0)
    // )
    ChangeState({
        triggers: createTriggers({
            1: And(
                Abs(time.add(100)).less(100),
                anim.notEqual(0)
            ),
            2: And(
                anim.equal(0),
                time.equal(0),
                parent.animelem.equal(10)
            )
        }),
        value: 0,
        ctrl: 1
    });
};
export default [letsStart, state2];