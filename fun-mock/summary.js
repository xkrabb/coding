const debounce1 = (fn, timeout, immediate) => {
    let timer = null;
    return (...args) => {
        if (immediate && !timer) {
            fn.call(this, ...args);
        }
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            if (!immediate) {
                fn.call(this, ...args);
            }
            timer = null;
        }, timeout);
    };
};
// leading, tailing 第一次执行，最后一次执行。不能同时false
const throttle1 = (fn, timeout, option) => {
    // timeout 和 时间差。 时间差控制首次，timeout控制尾部执行
};

class Promise1 {
    constructor(fn) {
        this.status = 'pending';
        this.resolveCallbacks = [];
        this.rejectCallbacks = [];
        this.data = undefined;
        this.reason = undefined;
        function resolve(data) {
            if (this.status === 'pending') {
                this.status = 'resolved';
                this.data = data;
                this.resolveCallbacks.forEach((cb) => {
                    cb.call(this, data);
                });
            }
        }
        function reject(reason) {
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.reason = reason;
                this.rejectCallbacks.forEach((cb) => {
                    cb.call(this, data);
                });
            }
        }
        try {
            fn(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    then(resolveCb, rejectCb) {
        const cb1 = typeof resolveCb === 'function' ? resolveCb : (v) => v;
        const cb2 =
            typeof rejectCb === 'function'
                ? rejectCb
                : (v) => {
                      throw v;
                  };

        const promise = new Promise1();
        if (this.status === 'resolved') {
        } else if (this.status === 'rejected') {
        } else {
            this.resolveCallbacks.push(cb1);
            this.resolveCallbacks.push(cb2);
        }
    }
}
