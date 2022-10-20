import { Character, Mugen } from '@tsmugen/core';
import '@tsmugen/global';

import states from './skills';

const char = new Character();

char.injectStates(states);

const mugen = new Mugen();

mugen.injectCharacter(char);

mugen.build();
