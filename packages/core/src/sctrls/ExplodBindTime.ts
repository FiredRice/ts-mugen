import { currentWrite } from '../core';
import { AttrValue, BaseSctrls } from '../types';
import { objectToString, triggersToString, versionCheck } from '../utils';

interface ExplodBindTimeParams extends BaseSctrls {
    /**
     * 仅当explod拥有的ID号等于id_no时才能影响他们的位置绑定.
     * 
     * 设置ID为-1来影响所有的explod.
     * - 默认值为-1.
     */
    ID?: AttrValue;
    /**
     * 指定explod应该被约束到绑定点的时间帧数.(explod被创建时定义)
     * 
     * time为-1时explod将被永久绑定或者直到另外的控制器改变绑定时间.
     * - 默认为1帧.
     */
    time?: AttrValue;
    /**
     * 替代语法
     * 
     * 也许可以用来代替time = binding_time
     */
    value?: AttrValue;
}

/**
 * ExplodBindTime 
 * 
 * 改变玩家的explod位置绑定时间.
 */
export default function ExplodBindTime(params: ExplodBindTimeParams) {
    const { triggers, describe = '', version, ...others } = params;
    versionCheck(function () {
        let result = `[State ${currentWrite.currentStateId}, ${describe}]\n`;
        result += `type = ExplodBindTime\n`;
        result += triggersToString(triggers);
        result += objectToString(others);
        currentWrite.append(result);
    }, version);
}