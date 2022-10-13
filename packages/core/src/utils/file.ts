import fs, { ReadStream, WriteStream } from 'fs-extra';
import { FileReturnData, FileType, PathLike, StatSyncOptions } from '../types';

const writeStreamMap = new Map<PathLike, WriteStream>();
const readStreamMap = new Map<PathLike, ReadStream>();

// type FileAttributes = {
//     IS_ARCHIVED?: boolean;
//     IS_HIDDEN?: boolean;
//     IS_NOT_CONTENT_INDEXED?: boolean; //remove this attribute if you don't want to change it
//     IS_OFFLINE?: boolean;
//     IS_READ_ONLY?: boolean;
//     IS_SYSTEM?: boolean;
//     IS_TEMPORARY?: boolean;
//     IS_UNPINNED?: boolean;
//     IS_PINNED?: boolean;
// };

class FileService {

    /**
     * 读取目录下第一级内容
     */
    public readDirectory = fs.promises.readdir;
    public readDirectorySync = fs.readdirSync;

    /**
     * 创建目录
     */
    public createDirectory = fs.promises.mkdir;
    public createDirectorySync = fs.mkdirSync;

    /**
     * 删除文件
     */
    public removeFile = fs.promises.unlink;
    public removeFileSync = fs.unlinkSync;

    /**
     * 删除目录
     */
    public removeDirectory = fs.promises.rmdir;
    public removeDirectorySync = fs.rmdirSync;

    /**
     * 重命名
     */
    public rename = fs.promises.rename;
    public renameSync = fs.renameSync;

    /**
     * 写入文件末尾
     */
    public writeEnd = fs.promises.appendFile;
    public writeEndSync = fs.appendFileSync;

    /**
     * 读取文件
     */
    public readFile = fs.promises.readFile;
    public readFileSync = fs.readFileSync;

    /**
     * 写文件
     */
    public writeFile = fs.promises.writeFile;
    public writeFileSync = fs.writeFileSync;

    /**
     * 检查文件类型
     */
    public getFileType(path: PathLike): FileReturnData<FileType> {
        return new Promise(function (resolve, reject) {
            fs.stat(path, function (error, stats) {
                if (error) {
                    resolve({ error, data: 'unknown' });
                } else {
                    resolve({
                        error: null,
                        data: stats.isFile() ? 'file' : stats.isDirectory() ? 'folder' : 'unknown'
                    });
                }
            });
        });
    }

    /**
     * 同步检查文件类型
     */
    public getFileTypeSync(path: PathLike, options?: StatSyncOptions): FileType {
        const stat = fs.statSync(path, options);
        if (stat?.isDirectory()) {
            return 'folder';
        } else if (stat?.isFile()) {
            return 'file';
        }
        return 'unknown';
    }

    /**
     * 创建文件
     */
    public createFile = fs.createFile;
    public createFileSync = fs.createFileSync;

    /**
     * 创建写文件流
     */
    public createWriteStream(path: PathLike) {
        let ws: WriteStream;
        if (writeStreamMap.has(path)) {
            ws = writeStreamMap.get(path)!;
        } else {
            ws = fs.createWriteStream(path);
            writeStreamMap.set(path, ws);
            ws.on('close', function () {
                writeStreamMap.delete(path);
            });
        }
        return ws;
    }

    /**
     * 创建写文件流
     */
    public createReadStream(path: PathLike) {
        let rs: ReadStream;
        if (readStreamMap.has(path)) {
            rs = readStreamMap.get(path)!;
        } else {
            rs = fs.createReadStream(path);
            readStreamMap.set(path, rs);
            rs.on('close', function () {
                readStreamMap.delete(path);
            });
        }
        return rs;
    }

    /**
     * 复制文件
     */
    public copy = fs.copy;
    public copySync = fs.copySync;

    public move = fs.move;
    public moveSync = fs.moveSync;

    /**
     * 更改文件的权限。
     */
    public chmod = fs.promises.chmod;
    public chmodSync = fs.chmodSync;

    // /**
    //  * 设置文件属性
    //  */
    // public setAttributes(pathToFileOrDir: string, attributes: FileAttributes = {}): Promise<boolean> {
    //     return new Promise(resolve => {
    //         fswin.setAttributes(pathToFileOrDir, attributes, function (succeeded) {
    //             resolve(succeeded);
    //         });
    //     });
    // };
    // public setAttributesSync(pathToFileOrDir: string, attributes: FileAttributes = {}): boolean {
    //     return fswin.setAttributesSync(pathToFileOrDir, attributes);
    // };
}

const fileService = new FileService();

export default fileService;