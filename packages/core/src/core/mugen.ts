import Character from './character';

export default class Mugen {
    protected char?: Character;

    /**
     * 注入角色
     */
    public injectCharacter(char: Character) {
        this.char = char;
    }

    /**
     * 输出 bundle 字符串
     */
    public toString() {
        const states = this.char!.getStates();
        let result = '';
        for (const state of states) {
            result += state.toString();
        }
        return result;
    }
}