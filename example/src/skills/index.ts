import { Helper, Null, State, ID, time, createTriggers, Or, NumHelper } from '@tsmugen/core';

const proj = new Helper(ID.add(3000));

const letsStart = new State({
    id: 1000,
    describe: 'Hello World!',
    type: 'S',
    movetype: 'I',
    physics: 'S',
    anim: 0
});

letsStart.appendControllers(function () {
    const triggers = createTriggers();
    triggers.add(1, Or(
        NumHelper(proj.id),
        proj.var(100).equal(30),
        proj.animelem.equal(2).overEqual(0)
    ));

    Null({ triggers: triggers });

    proj.create({
        triggers: time.equal(0),
        stateno: 1000,
    });


});

export default [letsStart];