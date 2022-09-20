import { statSync } from 'fs';

export { PathLike } from 'fs';

export type FileReturnData<DataType> = Promise<{
    data: DataType;
    error: NodeJS.ErrnoException | null;
}>;
export type StatSyncOptions = Parameters<typeof statSync>[1];

export type FileType = 'file' | 'folder' | 'unknown';

export type CloseCallback = (err?: NodeJS.ErrnoException | null) => void;
export type CloseFunction = (callback?: CloseCallback) => void;

export * from './mugen';