import { animelem, AttrValue, Helper, movement, Null, Or, State, Triggers, HelperVar, NumHelper, AfterImage } from '@tsmugen/core';

class SuperHelper extends Helper {
    public jiasudu: HelperVar;
    constructor(id: AttrValue) {
        super(id)
        this.jiasudu = new HelperVar(id, 1);
    }
}

class Proj extends State {
    public start = new SuperHelper(1300);

    constructor(statedef) {
        super(statedef);
    }
}

const projState = new Proj({
    id: 1300,
    type: 'S',
    movetype: 'I',
    physics: 'S',
    anim: 0
});

projState.appendControllers(function () {
    Null({ triggers: 1 });
});

const letsStart = new State({
    id: 1200,
    describe: 'Hello World!',
    type: 'S',
    movetype: 'I',
    physics: 'S',
    anim: 0
});

letsStart.appendControllers(function () {
    const triggers = new Triggers();
    const animNums = [1, 3, 4, 5, 8, 10];
    triggers.appendAll(NumHelper(projState.start.id))
    animNums.forEach(item => {
        triggers.append(
            animelem.equal(item),
            movement.airjump.num.equal(item),
            Or(
                projState.start.jiasudu.equal(5),
                projState.start.jiasudu.add(10).less(300)
            )
        );
    });

    AfterImage({
        triggers,
        version: '1.0',
        time: 15
    })
});

export default [letsStart, projState];