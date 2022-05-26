// https://juejin.cn/post/6850037281206566919#heading-0
class myPromise {
    constructor(fn) {
        this.status = 'pending';
        this.data = undefined;
        this.reason = undefined;
        this.resolveCallbacks = [];
        this.rejectCallbacks = [];

        const resolve = (data) => {
            if (this.status === 'pending') {
                this.status === 'resolve';
                this.data = data;
                this.resolveCallbacks.forEach((cb) => cb());
            }
        };
        const reject = (err) => {
            if (this.status === 'pending') {
                this.status === 'reject';
                this.reason = err;
                this.rejectCallbacks.forEach((cb) => cb());
            }
        };

        try {
            fn(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    then(resolveCb, rejectCb) {
        const resolveCallback = typeof resolveCb === 'function' ? resolveCb : (val) => val;
        const rejectCallback =
            typeof rejectCb === 'function'
                ? rejectCb
                : (reason) => {
                      throw new Error(reason);
                  };

        if (this.status === 'pending') {
            this.resolveCallbacks.push(resolveCallback);
            this.rejectCallbacks.push(rejectCallback);
        } else if (this.status === 'resolve') {
            // Promise.resolve().then() 情况
        } else if (this.status === 'reject') {
        }
        // return this;
        return new myPromise();
    }
    static resolve(data) {}
    static reject(err) {}
    static all(arr) {}
    static race(arr) {}
    catch(err) {}
    finally(cb) {}
}
