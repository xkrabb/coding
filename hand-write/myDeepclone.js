function deepClone(obj, map = new WeakMap()) {
    if (typeof obj === 'object' && obj !== null) {
        let res;
        if (Array.isArray(obj)) {
            res = [];
        } else {
            res = {};
        }
        for (const key in obj) {
            if (map.has(obj[key])) {
                res[key] = map.get(obj[key]);
            } else {
                res[key] = deepClone(obj[key], map);
                map.set(obj[key], res[key]);
            }
        }
        return res;
    } else {
        return obj;
    }
}
