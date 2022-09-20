import { Character, Mugen } from '@tsmugen/core';

const char = new Character();

// char.injectStates(states);

const mugen = new Mugen();

mugen.injectCharacter(char);

mugen.build();
