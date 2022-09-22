
export const joinDep = (deps: string[]) => {
    return deps.map(item => `\t\t${item}\r\n`).join('');
};