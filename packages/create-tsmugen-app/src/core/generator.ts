import ora from 'ora';
import { download } from '../utils';
import path from 'path';
import fs from 'fs-extra';

// 添加加载动画
async function wrapLoading(message: string, repo: string, dest: string) {
    // 使用 ora 初始化，传入提示信息 message
    const spinner = ora(message);
    // 开始加载动画
    spinner.start();
    const { data, error } = await download(repo, dest);
    if (error) {
        spinner.fail('Request failed, refetch ...');
        console.log(error);
    } else {
        spinner.succeed('Request succeed !!!');
        return data;
    }
}

export default class Generator {
    private name: string;
    private targetDir: string;

    constructor(name: string, targetDir: string) {
        // 目录名称
        this.name = name;
        // 创建位置
        this.targetDir = path.resolve(process.cwd(), targetDir);
    }

    private replaceConfig() {
        const pkgPath = `${this.targetDir}/package.json`;
        let pkg = fs.readFileSync(pkgPath).toString();
        pkg = pkg.replace('"name": "tsmugen-templete"', `"name": "${this.name}"`);
        fs.writeFileSync(pkgPath, pkg);
        const configPath = `${this.targetDir}/tsmugen.config.js`;
        let config = fs.readFileSync(configPath).toString();
        config = config.replace(`name: 'demo'`, `name: '${this.name}'`);
        fs.writeFileSync(configPath, config);
    }

    // 核心创建逻辑
    public async create() {
        await wrapLoading(
            'waiting download template\n', // 加载提示信息,
            'gitee:poxiaoxuefeng/tsmugen-templete',
            this.targetDir
        );
        this.replaceConfig();
        console.log(`\r\nSuccessfully created project ${this.name}`);
        console.log(`\r\ncd ${this.name} && (npm install || yarn)`);
    }
}