function myDebounce(fn, timeout) {
    let timer = null;
    return (...args) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...args);
        }, timeout);
    };
}

function myDebounce2(fn, timeout, immediate) {
    let timer = null;
    const debounceFn = (...args) => {
        if (immediate && !timer) {
            fn(...args);
        }

        if (timer) {
            timer = null;
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            if (!immediate) {
                fn(...args);
            }
        }, timeout);
    };

    debounceFn.cancel = () => {
        clearTimeout(timer);
        timer = null;
    };
    return;
}

function add() {
    console.log(this.a + this.b);
}
const obj = { a: 1, b: 2 };
const bindAdd = add.bind(obj);
const de = myDebounce(bindAdd, 300);

setTimeout(() => {
    de();
}, 200);
setTimeout(() => {
    de();
}, 400);
setTimeout(() => {
    de();
}, 600);
setTimeout(() => {
    de();
}, 800);
setTimeout(() => {
    de();
}, 1000);
