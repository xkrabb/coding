const myAjax = (url, method = 'get') => {
    const xhr = XMLHttpRequest();
    xhr.open(url, method, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status === 200) {
            const res = xhr.responseText;
        }
    };
    xhr.onerror = function () {};
    xhr.responseType = 'json';
    xhr.setRequestHeader('key', 'value');
    xhr.send('params');
};

Function.prototype.myCall = function (context, ...arg) {
    if (typeof this !== 'function') {
        throw TypeError();
    }
    const con = context || window;
    const symbolFn = Symbol();
    con[symbolFn] = this;
    const res = con[symbolFn](...arg);
    delete con[symbolFn];
    return res;
};

Function.prototype.myBind = function (context, ...arg1) {
    if (typeof this !== 'function') {
        throw TypeError();
    }
    const self = this;
    const con = context || window;
    const Nop = function () {};
    const beBound = function (...arg2) {
        self.call(this instanceof beBound ? this : con, ...arg1, arg2);
    };
    Nop.prototype = self.prototype;
    beBound.prototype = new Nop();
    return beBound;
};

const myCreate = function (proto) {
    function F() {}
    F.prototype = proto;
    return new F();
};

const myCurry = function (fn) {
    const paramsLen = fn.length;
    return function myCurr(...args) {
        if (args.length === paramsLen) {
            return fn.call(this, ...args);
        } else {
            return (...arg) => myCurr(...args, ...arg);
        }
    };
};

const myNew = function (Contr, ...args) {
    const obj = {};
    obj.__proto__ = Contr.prototype; // NOP
    const res = Contr.call(obj, ...args);
    if (typeof res === 'object') {
        return res;
    }
    return obj;
};

const myDeepClone = function (obj, map) {
    if (map === undefined) {
        map = new WeakMap();
    }
    // 基本数据类型直接返回，null返回
    if (obj === null || ['number', 'string', 'undefined', 'boolean'].includes(typeof obj)) {
        return obj;
    }
    // Regexp, Date, Function, Symbol, Set, Map 等特殊处理
    // 循环引用处理
    if (map.has(obj)) {
        return map.get(obj);
    }
    // 递归处理
    const res = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        res[key] = myDeepClone(obj[key]);
    }
    map.set(obj, res);
    return res;
};

const myDebounce = function (fn, wait, leading = true) {
    let timer = null;
    return function (...args) {
        clearTimeout(timer);
        if (leading && !timer) {
            // 第一次就执行
            fn.call(this, ...args);
        }
        timer = setTimeout(() => {
            // leading也需要定时器，避免多执行
            if (!leading) {
                fn.call(this, ...args);
            }
            timer = null;
        }, wait);
    };
};

const myThrottle = function (fn, wait, option) {
    const leading = option.leading !== false;
    const tailing = option.tailing !== false;
    let timer = null;
    let preTime = 0;
    return function (...args) {
        const now = +new Date();
        if (preTime === 0 && leading === false) {
            preTime = now;
        }
        const remaining = wait - (now - pre);
        if (remaining <= 0 || remaining > wait) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            fn.call(this, ...args);
            preTime = now;
        } else if (!timer && tailing === true) {
            // 最后一次执行，leading和tail不能同时为true？
            timer = setTimeout(() => {
                fn.call(this, ...args);
                timer = null;
                preTime = 0; //?
            }, remaining); // 这个延时不一定会执行：比如异步任务先执行
        }
    };
};

const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';
function myPromise(executor) {
    this.status = PENDING;
    this.data = null;
    this.reason = null;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (data) => {
        if (this.status === PENDING) {
            this.status = RESOLVED;
            this.data = data;
            // 回调是执行队列最后，利用setTimeout模拟
            this.resolvedCallbacks.forEach((fn) => {
                fn();
            });
        }
    };
    const reject = (reason) => {
        if (this.status === PENDING) {
            this.status = REJECTED;
            this.reason = reason;
            this.rejectedCallbacks.forEach((fn) => {
                fn();
            });
        }
    };
    try {
        executor(resolve, reject);
    } catch (err) {
        reject(err);
    }
}
myPromise.prototype.then = function (resolvedCb, rejectedCb) {
    const self = this;
    resolvedCb = typeof resolvedCb === 'function' ? resolvedCb : (data) => data;
    rejectedCb =
        typeof rejectedCb === 'function'
            ? rejectedCb
            : (reason) => {
                  throw Error(reason);
              };

    const promise2 = new myPromise((resolve, reject) => {
        if (self.status === PENDING) {
            self.resolvedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        const x = resolvedCb(self.data);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            });
            self.rejectedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        const x = rejectedCb(self.reason);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            });
        } else if (self.status === RESOLVED) {
            setTimeout(() => {
                try {
                    const x = resolvedCb(self.data);
                    resolvePromise(x, promise2, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            }, 0);
        } else if (self.status === REJECTED) {
            setTimeout(() => {
                try {
                    const x = rejectedCb(self.reason);
                    resolvePromise(x, promise2, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            }, 0);
        }
    });
    return promise2;
};

function resolvePromise(x, promise2, resolve, reject) {
    if (x === promise2) {
        throw TypeError();
    }
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        let isCalled = false;
        const then = x.then;
        if (typeof then === 'function') {
            try {
                then.call(
                    x,
                    (y) => {
                        if (isCalled) return;
                        isCalled = true;
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    (err) => {
                        if (isCalled) return;
                        isCalled = true;
                        reject(err);
                    }
                );
            } catch (error) {
                if (isCalled) return;
                isCalled = true;
                reject(error);
            }
        } else {
            if (isCalled) return;
            isCalled = true;
            resolve(x);
        }
    } else {
        resolve(x);
    }
}
