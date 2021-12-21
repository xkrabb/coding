function myDebounce(fn, wait, immediate) {
    let timer = null;
    function debounceFn(...args) {
        const self = this;
        if (immediate && !timer) {
            fn.call(this, ...args);
        }
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            if (!immediate) {
                fn.call(self, ...args);
            }
            timer = null;
        }, wait);
    }

    debounceFn.cancel = function () {
        clearTimeout(timer);
        timer = null;
    };
    return debounceFn;
}

let count = 0;

const print = () => {
    console.log('print count ', count);
};
const debounceTest = myDebounce(print, 1000, true);

interval = setInterval(() => {
    if (count < 20) {
        // print()
        debounceTest();
        count++;
    } else {
        clearInterval(interval);
    }
}, 100);

setTimeout(() => {
    console.log('out print');
    debounceTest();
}, 4000);
