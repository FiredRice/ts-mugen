import { Null, State } from '@tsmugen/core';

const letsStart = new State({
    id: 1000,
    describe: 'Hello World!',
    type: 'S',
    movetype: 'I',
    physics: 'S',
    anim: 0
});

letsStart.push(function () {
    Null({ triggers: 1 });
});

export default [letsStart];