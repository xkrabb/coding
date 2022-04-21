const myCompose = function (...fns) {
    if (fns.length === 0) return (v) => v;
    if (fns.length === 1) return fns[0];
    return (x) => {
        return fns.reduce((res, cur) => {
            return cur(res);
        }, x);
    };
};

const f1 = (x) => x + 1;
const f2 = (x) => x + 2;
const f3 = (x) => x + 3;
const co = myCompose(f1, f2, f3);
console.log('co', co(4));
