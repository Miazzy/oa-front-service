export const STORAGE_KEY = 'questionnaire';

/**
 * @function Set storage
 * @param name
 * @param content
 * @param maxAge
 */
export const setStore = (name, content, maxAge = null) => {
    if (!global.window || !name) {
        return;
    }

    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }

    let storage = global.window.localStorage;

    storage.setItem(name, content);
    if (maxAge && !isNaN(parseInt(maxAge))) {
        let timeout = parseInt(new Date().getTime() / 1000);
        storage.setItem(`${name}_expire`, timeout + maxAge);
    }
};

/**
 * @function Get storage
 * @param name
 * @returns {*}
 */
export const getStore = name => {
    if (!global.window || !name) {
        return;
    }

    let content = window.localStorage.getItem(name);
    let _expire = window.localStorage.getItem(`${name}_expire`);

    if (_expire) {
        let now = parseInt(new Date().getTime() / 1000);
        if (now > _expire) {
            return;
        }
    }

    try {
        return JSON.parse(content);
    } catch (e) {
        return content;
    }
};

/**
 * @function Clear storage
 * @param name
 */
export const clearStore = name => {
    if (!global.window || !name) {
        return;
    }

    window.localStorage.removeItem(name);
    window.localStorage.removeItem(`${name}_expire`);
};

/**
 * @function Clear all storage
 */
export const clearAll = () => {
    if (!global.window || !name) {
        return;
    }

    window.localStorage.clear();
};


/**
 * @function 获取缓存信息
 * @param {*} key 
 */
export const get = (key = STORAGE_KEY) => {
    return JSON.parse(window.localStorage.getItem(key));
};

/**
 * @function 设置缓存信息
 * @param {*} items 
 * @param {*} key 
 */
export const save = (items, key = STORAGE_KEY) => {
    window.localStorage.setItem(key, JSON.stringify(items));
};