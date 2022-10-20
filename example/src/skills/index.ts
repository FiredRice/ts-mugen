import { Null, AfterImage, createState, ChangeState } from '@tsmugen/core';

const letsStart = () => {
    createState({
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
    createState({
        id: 1500,
        describe: '测试',
        type: 'S',
        movetype: 'A',
        physics: 'N',
        anim: 2000
    });

    Null({
        triggers: NumHelper(),
        describe: 'Hello World2'
    });

    ChangeState({
        triggers: Abs(time.add(100)),
        value: 0,
        ctrl: 1
    });
};
export default [letsStart, state2];