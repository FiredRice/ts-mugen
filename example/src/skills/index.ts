import { State, createTriggers, AfterImageTime, time, DisplayToClipboard, Var, Width, HitDef, NotHitBy, AssertSpecial, SelfState } from '@tsmugen/core';


const letsStart = new State({
    id: 1000,
    describe: 'Hello World!',
    type: 'S',
    movetype: 'I',
    physics: 'S',
    anim: 0
});

const velTest = new Var(17);

function defaultHelper() {
    NotHitBy({
        triggers: 1,
        value: 'SCA'
    });

    AssertSpecial({
        triggers: 1,
        flag: 'noshadow',
        flag2: 'invisible'
    });
}

letsStart.appendControllers(function () {
    const triggers = createTriggers();
    defaultHelper();
    HitDef({
        triggers: time.equal(0),
        attr: 'SCA, NA',
        fall: {
            animtype: 'hard',
            xvelocity: 10
        }
    });
    AfterImageTime({
        triggers: time.equal(0),
        time: 30
    });

    DisplayToClipboard({
        triggers: 1,
        text: 'The value of var(17) is %d, which is %f%% of 23.\n\t--Kiwi.',
        params: [velTest.setValue(1), velTest.division(0.230)]
    });
});

export default [letsStart];