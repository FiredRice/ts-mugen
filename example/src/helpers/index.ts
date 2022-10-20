import { AttrValue, Helper } from '@tsmugen/core';

class SingleGlasses extends Helper {
    constructor(id: AttrValue) {
        super(id)
    }
    public initVelX = this.var(10);
}

export const singleGlasses = new SingleGlasses(3000);

export const customHelpers = {
    singleGlasses
};

export type CustomHelpers = typeof customHelpers;
