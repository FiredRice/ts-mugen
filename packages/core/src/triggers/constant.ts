import { BasePerfix, BaseTrigger } from './base';

export class ConstData extends BasePerfix {
    public constructor(perfix = '') {
        super(perfix);
    }

    public life = new BaseTrigger(`${this.getPerfix()}Const(data.life)`);
    public power = new BaseTrigger(`${this.getPerfix()}Const(data.power)`);
    public attack = new BaseTrigger(`${this.getPerfix()}Const(data.attack)`);
    public defence = new BaseTrigger(`${this.getPerfix()}Const(data.defence)`);
    public fall = {
        defence_mul: new BaseTrigger(`${this.getPerfix()}Const(data.fall.defence_mul)`)
    };
    public liedown = {
        time: new BaseTrigger(`${this.getPerfix()}Const(data.liedown.time)`)
    };
    public airjuggle = new BaseTrigger(`${this.getPerfix()}Const(data.airjuggle)`);
    public sparkno = new BaseTrigger(`${this.getPerfix()}Const(data.sparkno)`);
    public guard = {
        sparkno: new BaseTrigger(`${this.getPerfix()}Const(data.guard.sparkno)`)
    };
    public KO = {
        echo: new BaseTrigger(`${this.getPerfix()}Const(data.KO.echo)`)
    };
    public IntPersistIndex = new BaseTrigger(`${this.getPerfix()}Const(data.IntPersistIndex)`);
    public FloatPersistIndex = new BaseTrigger(`${this.getPerfix()}Const(data.FloatPersistIndex)`);
}

export const data = new ConstData();

export class ConstSize extends BasePerfix {
    public constructor(perfix = '') {
        super(perfix);
    }

    public xscale = new BaseTrigger(`${this.getPerfix()}Const(size.xscale)`);
    public yscale = new BaseTrigger(`${this.getPerfix()}Const(size.yscale)`);
    public ground = {
        back: new BaseTrigger(`${this.getPerfix()}Const(size.ground.back)`),
        front: new BaseTrigger(`${this.getPerfix()}Const(size.ground.front)`),
    };
    public air = {
        back: new BaseTrigger(`${this.getPerfix()}Const(size.air.back)`),
        front: new BaseTrigger(`${this.getPerfix()}Const(size.air.front)`),
    };
    public height = new BaseTrigger(`${this.getPerfix()}Const(size.height)`);
    public shadowoffset = new BaseTrigger(`${this.getPerfix()}Const(size.shadowoffset)`);
    public attack = {
        dist: new BaseTrigger(`${this.getPerfix()}Const(size.attack.dist)`)
    };
    public proj = {
        attack: {
            dist: new BaseTrigger(`${this.getPerfix()}Const(size.proj.attack.dist)`)
        },
        doscale: new BaseTrigger(`${this.getPerfix()}Const(size.proj.doscale)`)
    };
    public head = {
        pos: {
            x: new BaseTrigger(`${this.getPerfix()}Const(size.head.pos.x)`),
            y: new BaseTrigger(`${this.getPerfix()}Const(size.head.pos.y)`),
        }
    };
    public mid = {
        pos: {
            x: new BaseTrigger(`${this.getPerfix()}Const(size.mid.pos.x)`),
            y: new BaseTrigger(`${this.getPerfix()}Const(size.mid.pos.y)`),
        }
    };
    public draw = {
        offset: {
            x: new BaseTrigger(`${this.getPerfix()}Const(size.draw.offset.x)`),
            y: new BaseTrigger(`${this.getPerfix()}Const(size.draw.offset.y)`),
        }
    };
}

export const size = new ConstSize();

export class ConstVelocity extends BasePerfix {
    public constructor(perfix = '') {
        super(perfix);
    }

    public walk = {
        fwd: {
            x: new BaseTrigger(`${this.getPerfix()}Const(velocity.walk.fwd.x)`),
        },
        back: {
            x: new BaseTrigger(`${this.getPerfix()}Const(velocity.walk.back.x)`),
        },
    };
    public run = {
        fwd: {
            x: new BaseTrigger(`${this.getPerfix()}Const(velocity.run.fwd.x)`),
            y: new BaseTrigger(`${this.getPerfix()}Const(velocity.run.fwd.y)`),
        },
        back: {
            x: new BaseTrigger(`${this.getPerfix()}Const(velocity.run.back.x)`),
            y: new BaseTrigger(`${this.getPerfix()}Const(velocity.run.back.y)`),
        }
    };
    public jump = {
        y: new BaseTrigger(`${this.getPerfix()}Const(velocity.jump.y)`),
        neu: {
            x: new BaseTrigger(`${this.getPerfix()}Const(velocity.jump.neu.x)`),
        },
        back: {
            x: new BaseTrigger(`${this.getPerfix()}Const(velocity.jump.back.x)`),
        },
        fwd: {
            x: new BaseTrigger(`${this.getPerfix()}Const(velocity.jump.fwd.x)`),
        },
    };
    public runjump = {
        back: {
            x: new BaseTrigger(`${this.getPerfix()}Const(velocity.runjump.back.x)`),
        },
        fwd: {
            x: new BaseTrigger(`${this.getPerfix()}Const(velocity.runjump.fwd.x)`),
        },
    };
    public airjump = {
        y: new BaseTrigger(`${this.getPerfix()}Const(velocity.airjump.y)`),
        neu: {
            x: new BaseTrigger(`${this.getPerfix()}Const(velocity.airjump.neu.x)`),
        },
        back: {
            y: new BaseTrigger(`${this.getPerfix()}Const(velocity.airjump.back.y)`),
        },
        fwd: {
            x: new BaseTrigger(`${this.getPerfix()}Const(velocity.airjump.fwd.x)`),
        },
    };
    public air = {
        gethit: {
            groundrecover: {
                x: new BaseTrigger(`${this.getPerfix()}Const(velocity.air.gethit.groundrecover.x)`),
                y: new BaseTrigger(`${this.getPerfix()}Const(velocity.air.gethit.groundrecover.y)`),
            },
            airrecover: {
                mul: {
                    x: new BaseTrigger(`${this.getPerfix()}Const(velocity.air.gethit.airrecover.mul.x)`),
                    y: new BaseTrigger(`${this.getPerfix()}Const(velocity.air.gethit.airrecover.mul.y)`),
                },
                add: {
                    x: new BaseTrigger(`${this.getPerfix()}Const(velocity.air.gethit.airrecover.add.x)`),
                    y: new BaseTrigger(`${this.getPerfix()}Const(velocity.air.gethit.airrecover.add.y)`),
                },
                back: new BaseTrigger(`${this.getPerfix()}Const(velocity.air.gethit.airrecover.back)`),
                fwd: new BaseTrigger(`${this.getPerfix()}Const(velocity.air.gethit.airrecover.fwd)`),
                up: new BaseTrigger(`${this.getPerfix()}Const(velocity.air.gethit.airrecover.up)`),
                down: new BaseTrigger(`${this.getPerfix()}Const(velocity.air.gethit.airrecover.down)`),
            },
        }
    };
}

export const velocity = new ConstVelocity();

export class ConstMovement extends BasePerfix {
    public constructor(perfix = '') {
        super(perfix);
    }

    public airjump = {
        num: new BaseTrigger(`${this.getPerfix()}Const(movement.airjump.num)`),
        height: new BaseTrigger(`${this.getPerfix()}Const(movement.airjump.height)`),
    };
    public yaccel = new BaseTrigger(`${this.getPerfix()}Const(movement.yaccel)`);
    public stand = {
        Friction: new BaseTrigger(`${this.getPerfix()}Const(movement.stand.friction)`),
        friction: {
            threshold: new BaseTrigger(`${this.getPerfix()}Const(movement.stand.friction.threshold)`),
        }
    };
    public crouch = {
        Friction: new BaseTrigger(`${this.getPerfix()}Const(movement.crouch.friction)`),
        friction: {
            threshold: new BaseTrigger(`${this.getPerfix()}Const(movement.crouch.friction.threshold)`),
        }
    };
    public jump = {
        changeanim: {
            threshold: new BaseTrigger(`${this.getPerfix()}Const(movement.jump.changeanim.threshold)`),
        }
    }
    public air = {
        gethit: {
            groundlevel: new BaseTrigger(`${this.getPerfix()}Const(movement.air.gethit.groundlevel)`),
            groundrecover: {
                ground: {
                    threshold: new BaseTrigger(`${this.getPerfix()}Const(movement.air.gethit.groundrecover.ground.threshold)`),
                },
                groundlevel: new BaseTrigger(`${this.getPerfix()}Const(movement.air.gethit.groundrecover.groundlevel)`),
            },
            airrecover: {
                threshold: new BaseTrigger(`${this.getPerfix()}Const(movement.air.gethit.airrecover.threshold)`),
                yaccel: new BaseTrigger(`${this.getPerfix()}Const(movement.air.gethit.airrecover.yaccel)`),
            },
            trip: {
                groundlevel: new BaseTrigger(`${this.getPerfix()}Const(movement.air.gethit.trip.groundlevel)`),
            }
        }
    };
    public down = {
        bounce: {
            offset: {
                x: new BaseTrigger(`${this.getPerfix()}Const(movement.down.bounce.offset.x)`),
                y: new BaseTrigger(`${this.getPerfix()}Const(movement.down.bounce.offset.y)`),
            },
            yaccel: new BaseTrigger(`${this.getPerfix()}Const(movement.down.bounce.yaccel)`),
            groundlevel: new BaseTrigger(`${this.getPerfix()}Const(movement.down.bounce.groundlevel)`),
        },
        friction: {
            threshold: new BaseTrigger(`${this.getPerfix()}Const(movement.down.friction.threshold)`),
        }
    }
}

export const movement = new ConstMovement();
