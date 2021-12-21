const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function MyPromise(executor) {
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];
    const resolve = (val) => {
        if (this.status === PENDING) {
            this.status = FULFILLED;
            this.value = val;
            this.resolveCallbacks.forEach((fn) => {
                fn();
            });
        }
    };
    const reject = (reason) => {
        if (this.status === PENDING) {
            this.status = REJECTED;
            this.reason = resolve;
            this.rejectCallbacks.forEach((fn) => {
                fn();
            });
        }
    };
    try {
        executor(resolve, reject);
    } catch (error) {
        reject(error);
    }
}

MyPromise.prototype.then = function (onFulFilled, onRejected) {
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : (v) => v;
    onRejected =
        typeof onRejected === 'function'
            ? onRejected
            : (reason) => {
                  throw reason;
              };
    const self = this;

    let promise2 = new MyPromise((resolve, reject) => {
        if (self.status === FULFILLED) {
            // 确保then回调在最后执行
            setTimeout(() => {
                try {
                    const x = onFulFilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(e);
                }
            }, 0);
        } else if (self.status === REJECTED) {
            setTimeout(() => {
                try {
                    const x = onRejected(this.reason);
                } catch (error) {
                    reject(error);
                }
            }, 0);
        } else if (self.status === PENDING) {
            self.resolveCallbacks.push(() => {
                // 如果resolve不是异步调用，确保回调会再构造函数之后执行
                setTimeout(() => {
                    try {
                        const x = onFulFilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(e);
                    }
                }, 0);
            });
            self.rejectCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            });
        }
    });
    return promise2;
};

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        throw TypeError('不能返回当前实例');
    }
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        // 返回的是thenable则不能重复执行
        let called = false;
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(
                    x,
                    (y) => {
                        if (called) return;
                        called = true;
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    (err) => {
                        if (called) return;
                        called = true;
                        reject(err);
                    }
                );
            } else {
                if (called) return;
                called = true;
                resolve(x);
            }
        } catch (error) {
            reject(error);
        }
    } else {
        resolve(x);
    }
}

MyPromise.prototype.catch = function () {};
MyPromise.prototype.finally = function () {};

MyPromise.all = function () {};
MyPromise.race = function () {};
MyPromise.reject = function (reason) {}; // 返回新的promise只有reject调用
MyPromise.resolve = function (params) {}; // 参数是promise直接返回，thenable则返回新的promise调用resolve

// new MyPromise((resolve, reject) => {
//     console.log('promise constr');
//     resolve(1);
// })
//     .then((val) => {
//         console.log('then success', val);
//         return 2;
//     })
//     .then((val) => {
//         console.log('then success', val);
//     });

new MyPromise((resolve, reject) => {
    console.log('1');
    resolve(2);
    console.log('2');
}).then((res) => {
    console.log('3', res);
});
console.log('4');
