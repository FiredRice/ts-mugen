import { injectPlayerHelper, injectPlayerVars } from '@tsmugen/global';
import { customHelpers, singleGlasses } from '../helpers';
import { customVars } from '../vars';

let player1 = injectPlayerVars(playerId(singleGlasses.initVelX), customVars);
player1 = injectPlayerHelper(player1, customHelpers);

let enemyFarthest = injectPlayerVars(EnemyNear(NumEnemy.sub(1)), customVars);
enemyFarthest = injectPlayerHelper(enemyFarthest, customHelpers);

export {
    player1,
    enemyFarthest
};