import { Character } from '@tsmugen/core';
import MugenEngine from '@tsmugen/engine';

const char = new Character();

// char.injectStates(states);

const mugen = new MugenEngine();

mugen.injectCharacter(char);

mugen.build();
