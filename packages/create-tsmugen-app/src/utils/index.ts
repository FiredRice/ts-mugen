import gitclone from 'git-clone/promise';
import rimraf from 'rimraf';

/**
 * Download `repo` to `dest` and callback `fn(err)`.
 *
 * @param {String} repo
 * @param {String} dest
 * @param {Object} opts
 * @param {Function} fn
 */

export function download(repo: string, dest: string, opts?: any) {
    const _repo = normalize(repo);
    const url = _repo.url || getUrl(_repo);

    const cloneOptions = {
        checkout: _repo.checkout,
        shallow: _repo.checkout === 'master',
        ...opts
    };
    return gitclone(url, dest, cloneOptions)
        .then(function (data) {
            rimraf.sync(`${dest}/.git`);
            return { data, error: null };
        })
        .catch(function (error) {
            return { data: null, error };
        });
}

/**
 * Normalize a repo string.
 *
 * @param {String} repo
 * @return {Object}
 */

function normalize(repo: string) {
    let regex = /^(?:(direct):([^#]+)(?:#(.+))?)$/;
    let match = regex.exec(repo);

    if (match) {
        const url = match[2];
        const directCheckout = match[3] || 'master';
        return {
            type: 'direct',
            url,
            checkout: directCheckout
        };
    } else {
        regex = /^(?:(github|gitlab|bitbucket|gitee):)?(?:(.+):)?([^/]+)\/([^#]+)(?:#(.+))?$/;
        match = regex.exec(repo);
        let type = match![1] || 'gitee';
        let origin = match![2] || null;
        let owner = match![3];
        let name = match![4];
        let checkout = match![5] || 'master';

        if (origin == null) {
            if (type === 'github') {
                origin = 'github.com';
            } else if (type === 'gitlab') {
                origin = 'gitlab.com';
            } else if (type === 'bitbucket') {
                origin = 'bitbucket.org';
            } else if (type === 'gitee') {
                origin = 'gitee.com';
            }
        }
        return {
            type,
            origin,
            owner,
            name,
            checkout
        };
    }
}

/**
 * Adds protocol to url in none specified
 *
 * @param {String} url
 * @return {String}
 */

function addProtocol(origin: string) {
    if (!/^(f|ht)tps?:\/\//i.test(origin)) {
        return `https://${origin}`;
    }
    return origin;
}

/**
 * Return a zip or git url for a given `repo`.
 *
 * @param {Object} repo
 * @return {String}
 */

function getUrl(repo) {
    let origin = addProtocol(repo.origin);
    if (/^git@/i.test(origin)) {
        origin = origin + ':';
    } else {
        origin = origin + '/';
    }
    return `${origin}${repo.owner}/${repo.name}.git`;
}