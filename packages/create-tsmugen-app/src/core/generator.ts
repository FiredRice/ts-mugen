import ora from 'ora';
import downloadGitRepo from 'npm-gitee-lw';
import path from 'path';
import promisify from 'util.promisify';

const download = promisify(downloadGitRepo)

// 添加加载动画
async function wrapLoading(fn: Function, message: string, ...args: any[]) {
    // 使用 ora 初始化，传入提示信息 message
    const spinner = ora(message);
    // 开始加载动画
    spinner.start();

    try {
        // 执行传入方法 fn
        const result = await fn(...args);
        // 状态为修改为成功Place choose a tag to create project
        spinner.succeed('Request succeed !!!');
        return result;
    } catch (error) {
        // 状态为修改为失败
        spinner.fail('Request failed, refetch ...');
        console.log(error);
    }
}

export default class Generator {
    private name: string;
    private targetDir: string;

    constructor(name: string, targetDir: string) {
        // 目录名称
        this.name = name;
        // 创建位置
        this.targetDir = targetDir;
    }

    // 核心创建逻辑
    public async create() {
        await wrapLoading(
            download,
            'waiting download template\n', // 加载提示信息,
            'gitee:poxiaoxuefeng/tsmugen-templete',
            path.resolve(process.cwd(), this.targetDir)
        );
        console.log(`\r\nSuccessfully created project ${this.name}`);
        console.log(`\r\ncd ${this.name} && (npm install || yarn)`);
    }
}