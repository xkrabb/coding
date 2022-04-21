const obj = {
    a: {
        b: 1,
        c: 2,
        d: { e: 5 }
    },
    b: [1, 3, { a: 2, b: 3 }],
    c: 3
};

// {
//  'a.b': 1,
//  'a.c': 2,
//  'a.d.e': 5,
//  'b[0]': 1,
//  'b[1]': 3,
//  'b[2].a': 2,
//  'b[2].b': 3
//   c: 3
// }

function isObject(val) {
    return typeof val === 'object' && val !== null;
}

const myObj2Flatten = (obj) => {
    const res = {};
    if (!isObject(obj)) return;
    const dfs = (cur, prefix) => {
        if (isObject(cur)) {
            if (Array.isArray(cur)) {
                cur.forEach((item, index) => {
                    dfs(item, `${prefix}[${index}]`);
                });
            } else {
                Object.keys(cur).forEach((key) => {
                    dfs(cur[key], prefix ? `${prefix}.${key}` : key);
                });
            }
        } else {
            res[prefix] = cur;
        }
    };

    dfs(obj, '');
    return res;
};

const f = myObj2Flatten(obj);
console.log('o2f', f);

// 反向
const flatten2Obj = (obj) => {
    const res = {};
    Object.keys(obj).forEach((key) => {
        const arr1 = key.split('.');
        const arr = arr1.reduce((res, cur) => {
            if (/\[\d+\]/g.test(cur)) {
                const sp = cur.split('[');
                res.push(...[sp[0], sp[1].replace(']', '')]);
            } else {
                res.push(cur);
            }
            return res;
        }, []);

        let idx = 0;
        let tmp = res;
        while (idx < arr.length - 1) {
            if (!tmp[arr[idx]]) {
                if (/\d+/.test(arr[idx + 1])) {
                    tmp[arr[idx]] = [];
                } else {
                    tmp[arr[idx]] = {};
                }
            }
            tmp = tmp[arr[idx]];
            idx++;
        }
        tmp[arr.pop()] = obj[key];
    });
    return res;
};

console.log('--', flatten2Obj(f));
