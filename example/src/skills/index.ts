import { State, AfterImageTime, DisplayToClipboard, Var, HitDef, NotHitBy, AssertSpecial, Triggers, global } from '@tsmugen/core';


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
    const triggers = new Triggers();
    const animNums = [1, 3, 4, 5, 8, 10];
    animNums.forEach(item => {
        triggers.appendAnd(
            global.animelem.equal(item),
            global.movement.airjump.num.equal(item)
        );
    });
    const charWidth = global.size.ground.back.add(global.size.ground.front);
    defaultHelper();
    HitDef({
        triggers: new Triggers().appendOr(
            global.time.equal(0),
            charWidth.less(300)
        ),
        attr: 'SCA, NA',
        fall: {
            animtype: 'hard',
            xvelocity: 10
        }
    });
    AfterImageTime({
        triggers: triggers,
        time: 30
    });

    DisplayToClipboard({
        triggers: 1,
        text: 'The value of var(17) is %d, which is %f%% of 23.\n\t--Kiwi.',
        params: [velTest.setValue(1), velTest.division(0.230)]
    });
});

export default [letsStart];