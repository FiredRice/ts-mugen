import { State, createTriggers, AfterImageTime, time, DisplayToClipboard, Var } from '@tsmugen/core';


const letsStart = new State({
    id: 1000,
    describe: 'Hello World!',
    type: 'S',
    movetype: 'I',
    physics: 'S',
    anim: 0
});

const velTest = new Var(17);

letsStart.appendControllers(function () {
    const triggers = createTriggers();

    AfterImageTime({
        triggers: time.equal(0),
        time: 30
    });

    DisplayToClipboard({
        triggers: 1,
        text: 'The value of var(17) is %d, which is %f%% of 23.\n\t--Kiwi.',
        params: [velTest.setValue(1), velTest.division(0.230)]
    })
});

export default [letsStart];