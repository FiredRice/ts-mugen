import { currentWrite } from '../core';
import { BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils/index';

type SpecialFlag =
    | 'intro'
    | 'invisible'
    | 'roundnotover'
    | 'nobardisplay'
    | 'noBG'
    | 'noFG'
    | 'nostandguard'
    | 'nocrouchguard'
    | 'noairguard'
    | 'noautoturn'
    | 'nojugglecheck'
    | 'nokosnd'
    | 'nokoslow'
    | 'noshadow'
    | 'globalnoshadow'
    | 'nomusic'
    | 'nowalk'
    | 'timerfreeze'
    | 'unguardable';

interface AssertSpecialParams extends BaseSctrls {
    flag?: SpecialFlag;
    flag2?: SpecialFlag;
    flag3?: SpecialFlag;
}

/**
 * AssertSpecial 
 * - 此控制器此允许你同时断言3个特殊的标示.
 */
export default function AssertSpecial(params: AssertSpecialParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = AssertSpecial\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}