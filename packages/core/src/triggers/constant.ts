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