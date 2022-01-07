// 深拷贝
function deepClone(target) {
    if (target === null) return null;
    if (typeof target === 'function') {
        // TODO 函数拷贝
        return cloneFun(target);
    }
    if (typeof target !== 'object') return target;
    // 只考虑objet和array
    const res = Array.isArray(target) ? [] : {};
    for (const key in target) {
        res[key] = typeof target[key] === 'object' ? deepClone(target[key]) : target[key];
    }
    return res;
}

const a = { a: { b: 1 }, c: 2, d: { e: [1, 2], f: null } };
// console.log(deepClone(a));

function mockNew(target, ...args) {
    // 创建空对象
    const obj = {};
    // 原型，指向构造函数原型，或者空对象实例链接原型，避免target.prototype修改影响obj实例
    obj.__proto__ = target.prototype;
    // this指向
    const result = target.call(obj, ...args);
    // 返回
    return typeof result === 'object' ? object : obj;
}

const eventBus = () => {
    const callbacks = {}; // new Map(), get, set
    const addEvent = (type, cb) => {
        if (callbacks[type]) {
            callbacks[type].push(cb);
        } else {
            callbacks[type] = [cb];
        }
    };
    const removeEvent = (type, cb) => {
        const cbs = callbacks[type] || [];
        callbacks[type] = cbs.filter((storedCb) => storedCb !== cb);
    };
    const emit = (type) => {
        (callbacks[type] || []).forEach((cb) => {
            cb();
        });
    };
    return {
        addEvent,
        removeEvent,
        emit
    };
};

// call, apply(数组)：将函数挂到context上执行
Function.prototype.myCall = (context) => {
    const con = context || window;
    con.fn = this; // fn可以用symbol处理
    const args = [...arguments].slice(1);
    const res = con.fn(...args); // apply arguments[1]是否存在调用
    delete con.fn;
    return res;
};

// 返回一个新函数，函数内利用call或apply实现改变绑定 （原型需要处理, 断开原型引用，避免修改）
Function.prototype.myBind = (context) => {
    if (typeof this !== 'function') {
        return TypeError('error');
    }
    const con = context || window;
    const self = this; // 函数本身
    const fNop = function () {};
    const args = [...arguments].slice(1);
    function boundFun() {
        const bindArgs = [...arguments].slice(1);
        // 如果函数被new，this指向会被修改
        return self.apply(this instanceof boundFun ? this : con, [...args, ...bindArgs]);
    }
    fNop.prototype = this.prototype;
    // 断开prototype，避免修改boundFun原型时候影响原函数
    boundFun.prototype = new fNop();
    return boundFun;
};

function MyPromise(executor) {
    const self = this;
    this.status = 'pending'; // rejected, fulfilled
    this.fulfilledCallbacks = [];
    this.rejectedCallbacks = [];
    this.value = undefined;
    this.reason = undefined;

    function resolve(val) {
        if (self.status === 'pending') {
            self.status = 'fulfilled';
            self.value = val;
            self.fulfilledCallbacks.forEach((cb) => {
                cb();
            });
        }
    }
    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected';
            self.reason = reason;
            self.rejectedCallbacks.forEach((cb) => {
                cb();
            });
        }
    }
    try {
        executor(resolve, reject);
    } catch (err) {
        reject(err);
    }
}

MyPromise.prototype.then = function (successCb, failCb) {
    const onFulfilled = typeof successCb === 'function' ? successCb : (v) => v;
    const onRejected =
        typeof failCb === 'function'
            ? failCb
            : (reason) => {
                  throw reason;
              };
    const self = this;
    // then返回一个新的promise
    const promise2 = new MyPromise((resolve, reject) => {
        if (this.status === 'pending') {
            this.fulfilledCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        const res = onFulfilled(self.value);
                        resolvePromise(promise2, res, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            });
            this.rejectedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        const res = onRejected(self.reason);
                        resolvePromise(promise2, res, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            });
        }
        // 如果执行时候，状态已经变更，则直接处理
        if (this.status === 'fulfilled') {
            // setTimeout模拟微任务，延时执行
            setTimeout(() => {
                try {
                    const res = onFulfilled(self.value);
                    resolvePromise(promise2, res, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }, 0);
        }
        if (this.status === 'rejected') {
            setTimeout(() => {
                try {
                    const res = onRejected(self.reason);
                    resolvePromise(promise2, res, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }, 0);
        }
    });
    return promise2;
};
// 处理 resolve 逻辑。执行结果是promise或thenable分别处理
function resolvePromise(promise2, res, resolve, reject) {
    if (promise2 === res) {
        reject(new TypeError('需要返回不同promise'));
    }
    if ((res && typeof res === 'object') || typeof res === 'function') {
        let used = false;
        if (used) return;
        try {
            if (typeof res === 'function') {
                const then = res.then;
                then.call(
                    res,
                    (val) => {
                        used = true;
                        resolvePromise(promise2, val, resolve, reject);
                    },
                    (err) => {
                        used = true;
                        reject(err);
                    }
                );
            } else {
                used = true;
                resolve(res);
            }
        } catch (e) {
            used = true;
            reject(e);
        }
    } else {
        resolve(res);
    }
}

// 原型链继承
function Animal(name) {
    this.name = name;
    this.sleep = function () {};
}
Animal.prototype.eat = function () {};
// 子类继承
function Cat() {}
Cat.prototype = new Animal();

// 数组扁平化，数组参数校验省略
function flatten(arr) {
    return arr.reduce((res, cur) => {
        if (Array.isArray(cur)) {
            res.push(...flatten(cur));
        } else {
            res.push(cur);
        }
        return res;
    }, []);
}

// console.log(flatten([1, [2, [3, 4]]]));

// 解析url的query参数，多值，a[b]类型，空格%20
function getUrlParams(url) {
    return url
        .slice(url.indexOf('?') + 1)
        .split('&')
        .reduce((res, cur) => {
            const [key, value] = cur.split('=');
            if (value) {
                if (res[key]) {
                    if (Array.isArray(res[key])) {
                        res[key].push(value);
                    } else {
                        res[key] = [res[key], value];
                    }
                } else {
                    res[key] = value;
                }
            }
            return res;
        }, {});
}
console.log(getUrlParams('http://www.xxx.com?a&b&c&c=1&c=2&c=3&d=4&d=5&e=6'));

// 函数柯里化
function curry(fn) {
    const len = fn.length;
    return function curriedFun(...args) {
        if (args.length === len) {
            return fn.call(this, ...args);
        } else {
            return (...arg1) => curriedFun.call(this, ...args, ...arg1);
        }
    };
}
function add(a, b, c) {
    return a + b + c;
}
const add1 = curry(add);
console.log(add1(1, 2)(3));

function debounce(fn, wait = 50, immediate = false) {
    let self = null;
    let timer = null;
    let args = null;
    const later = function () {
        return setTimeout(() => {
            timer = null;
            if (!immediate) {
                fn.call(self, ...args);
            }
        }, wait);
    };
    return function (...params) {
        self = this;
        args = params;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        } else {
            // 立即执行也是需要定时器的，用于判断是否间隔内又触发了
            if (immediate) {
                fn.call(self, ...args);
            }
        }

        timer = later();
    };
}

function throttle(fn, wait, option) {}
