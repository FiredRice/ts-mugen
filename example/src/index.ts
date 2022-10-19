import { Character, Mugen } from '@tsmugen/core';
import * as allTriggers from '@tsmugen/core/lib/cjs/triggers';
import states from './skills';

Object.keys(allTriggers).forEach(key => {
    global[key] = allTriggers[key];
});

const char = new Character();

char.injectStates(states);

const mugen = new Mugen();

mugen.injectCharacter(char);

mugen.build();
