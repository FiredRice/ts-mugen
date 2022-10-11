import { getMugenConfig, MugenConfig } from '@tsmugen/utils';
import { State } from '../state';
import { fileService } from '../utils';
import Character from './character';
import { currentWrite } from './currentWrite';

export default class Mugen<T extends State> {
    protected char?: Character<T>;
    private rootPath: string;
    private config: MugenConfig;

    public constructor() {
        this.config = getMugenConfig();
        this.rootPath = this.config?.output || 'lib';
    }

    /**
     * 注入角色
     */
    public injectCharacter(char: Character<T>) {
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

    /**
     * 创建入口文件
     */
    private createDef(): Promise<boolean> {
        return new Promise(async resolve => {
            const { name, version } = this.char!.getInfo();
            const exceptVersion = version === '1.0' ? '1.1' : '1.0';
            const basePath = `${this.rootPath}/${version}/${name}`;
            // 创建配置文件
            await fileService.createFile(`${basePath}/${name}.def`);

            // 复制静态资源
            fileService.copy('public', basePath, {
                filter: src => !src.includes(exceptVersion) && !src.includes('.def')
            });

            // 获取模板信息
            const modelConfigBuffer = fileService.readFileSync('public/index.def');
            let modelConfig = modelConfigBuffer.toString();

            const defWs = fileService.createWriteStream(`${basePath}/${name}.def`);
            // 替换占位符
            modelConfig = modelConfig.replace(/%INFO%/g, this.char!.toString());
            modelConfig = modelConfig.replace(/%STATES%/g, 'st = cns/bundle.cns');
            modelConfig = modelConfig.replace(/%VERSION%/g, version);

            defWs.write(modelConfig);
            defWs.close();
            defWs.on('close', function () {
                resolve(true);
            });
        });
    }

    /**
     * 打包 states
     */
    private createBundle(): Promise<boolean> {
        return new Promise(async resolve => {
            const { version, name } = this.char!.getInfo();
            const basePath = `${this.rootPath}/${version}/${name}`;
            await fileService.createFile(`${basePath}/cns/bundle.cns`);
            const stWs = fileService.createWriteStream(`${basePath}/cns/bundle.cns`);
            const states = this.char!.getStates();
            for (const state of states) {
                stWs.write(state.toString());
            }
            stWs.close();
            stWs.on('close', function () {
                resolve(true);
            });
        });
    }

    /**
     * 输出变量表
     */
    private createVarLog(): Promise<boolean> {
        return new Promise(async resolve => {
            if (this.config.buildVariableTable) {
                const rootVarMap = currentWrite.getVarRecords();
                const rootFVarMap = currentWrite.getFVarRecords();
                const { version, name } = this.char!.getInfo();
                const path = `${this.rootPath}/${version}/${name}/变量表.txt`;
                // 创建变量表文件
                await fileService.createFile(path);
                const ws = fileService.createWriteStream(path);
                const varKeys = Object.keys(rootVarMap).sort((a, b) => Number(a) - Number(b));
                const fvarKeys = Object.keys(rootFVarMap).sort((a, b) => Number(a) - Number(b));
                ws.write(`==| 整型 |=====================\n`);
                for (const key of varKeys) {
                    ws.write(`var(${key}) : ${rootVarMap[key] || ''}\n`);
                }
                ws.write(`==| 浮点型 |====================\n`);
                for (const key of fvarKeys) {
                    ws.write(`fvar(${key}) : ${rootFVarMap[key] || ''}\n`);
                }
                ws.close();
                ws.on('close', function () {
                    resolve(true);
                });
            }
            resolve(true);
        });
    }

    /**
     * 开始构建
     * @param versions 构建版本（1.0，1.1）
     */
    public async build() {
        try {
            if (this.char) {
                const { name, version } = this.char.getInfo();
                if (/^[^？\\*|“<>:/+?%#&=\s]*$/.test(name)) {
                    console.log(`开始构建人物包`);
                    console.log(`[name]: ${name}`);
                    console.log(`[version]: ${version}`);
                    await Promise.all([
                        this.createDef(),
                        this.createBundle(),
                        this.createVarLog()
                    ]);
                    console.log(`构建完毕`);
                } else {
                    throw new Error('name 不能包含特殊字符');
                }
            } else {
                console.log('[No Character]：请注入角色');
            }
        } catch (error) {
            console.log(error);
        }
    }
}