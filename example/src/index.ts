import '@tsmugen/global';
import { Character, Mugen } from '@tsmugen/core';
import { injectGlobalHelpers, injectGlobalVars } from '@tsmugen/global';
import states from './skills';
import { customVars } from './vars';
import { customHelpers } from './helpers';

injectGlobalVars(customVars);
injectGlobalHelpers(customHelpers);

const char = new Character();

char.injectStates(states);

const mugen = new Mugen();

mugen.injectCharacter(char);

mugen.build();
