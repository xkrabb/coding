function myDeepClone(obj, map = new WeakMap()) {
    if (typeof obj !== 'object' || obj === null) return obj;
    // TODO symbol, function, reg; map, set
    if (typeof obj === 'function') {
        //
    }
    const res = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        const target = obj[key];
        if (typeof target === 'object') {
            if (map.has(target)) {
                res[key] = map.get(target);
            } else {
                const cloned = myDeepClone(target);
                res[key] = cloned;
                map.set(target, cloned);
            }
        } else {
            res[key] = target;
        }
    }
    return res;
}

const obj1 = { a: 1, b: [2, 2, 2] };
const obj2 = { c: 3, d: 4 };
const obj = {
    obj1,
    cur: {
        obj2,
        obj1,
        arr: [5, 5, 5]
    }
};

console.log(JSON.stringify(obj));
const cloned = myDeepClone(obj);
obj.cur.obj2.c = 33;
console.log(JSON.stringify(obj));
console.log(JSON.stringify(cloned));
