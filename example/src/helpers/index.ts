import { Helper, root, enemynear, parent, Var, AttrValue } from '@tsmugen/core';
import { injectPlayerVars } from '@tsmugen/global';

class SingleGlasses extends Helper {
    public initVelX = this.var(10);
    public initVelY = this.var(11);
    constructor(id?: AttrValue) {
        super(id);
    }
}

const helperVars = {
    initVelX: new Var(10),
    initVelY: new Var(11),
};

export const singleGlasses = injectPlayerVars(new Helper(ID.add(3000)), helperVars);
export const singleGlassesRoot = injectPlayerVars(new Helper(root.ID.add(3000)), helperVars);
export const singleGlassesEnemynear = injectPlayerVars(new Helper(enemynear.ID.add(3000)), helperVars);
export const singleGlassesParent = injectPlayerVars(new Helper(parent.ID.add(3000)), helperVars);

export const customHelpers = {
    singleGlassesRoot,
    singleGlassesEnemynear,
    singleGlassesParent
};

export type CustomHelpers = typeof customHelpers;
