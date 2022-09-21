import inquirer from 'inquirer';
import path from 'path';
import validateProjectName from 'validate-npm-package-name';
import fs from 'fs-extra';
import Generator from './generator';

export default async function init(projectName: string) {
    const result = validateProjectName(projectName);
    if (!result.validForNewPackages) {
        console.error(`Invalid project name: "${projectName}"`);
        result.errors && result.errors.forEach(err => {
            console.error('Error: ' + err);
        });
        result.warnings && result.warnings.forEach(warn => {
            console.error('Warning: ' + warn);
        });
        process.exit(1);
    }
    const targetAir = path.join(process.cwd(), projectName);
    if (fs.existsSync(targetAir)) {
        const inquirerParams = [{
            name: 'action',
            type: 'list',
            message: '目标文件目录已经存在，请选择如下操作：',
            choices: [
                { name: '移除已有目录', value: 'remove' },
                { name: '取消当前操作', value: 'cancel' }
            ]
        }];
        let inquirerData = await inquirer.prompt(inquirerParams);
        if (!inquirerData.action || inquirerData.action === 'cancel') {
            return;
        } else if (inquirerData.action === 'remove') {
            // 移除已存在的目录
            console.log(`\r\nRemoving...`);
            await fs.remove(targetAir);
        }
    }
    const generator = new Generator(projectName, targetAir);
    generator.create();
}