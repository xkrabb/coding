function myThrottle1(fn, wait) {
    let timer = null;

    return function fun(...args) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.call(this, ...args);
                timer = null;
            }, wait);
        }
    };
}
function myThrottle2(fn, wait) {
    let prevTime = 0;
    return function fun(...args) {
        const now = +new Date();
        if (now - prevTime > wait) {
            fn.call(this, ...args);
            prevTime = now;
        }
    };
}

// leading（时间）,tailing（定时器）不能同时false
function myThrottle(fn, wait, option = {}) {
    let timer = null;
    let prevTime = 0;
    const leading = option.leading !== false;
    const tailing = option.tailing !== false;
    return function fun(...args) {
        const now = +new Date();
        // 第一次时候，判断lading标记
        if (prevTime === 0 && leading === false) {
            prevTime = now;
        }
        // 标记最后一次执行延时
        let remaining = wait - (now - prevTime);
        // 第二个条件一般不会成立，除非改系统时间，now比prevTime还小
        if (remaining <= 0 || remaining > wait) {
            // 已经执行了，定时器任务就可以不用执行
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            fn.call(this, ...args);
            prevTime = now;
        } else if (!timer && tailing === true) {
            // 需要尾调用，才创建定时器，执行肯定是本轮最后一次
            timer = setTimeout(() => {
                fn.call(this, ...args);
                timer = null;
                prevTime = 0;
                // 固定间隔执行，此处是剩余时间；多一帧时间，避免timer回调先执行
            }, remaining + 20);
        }
    };
}

let count = 0;

function print(info) {
    console.log('print ', info, ' count ', count);
}

const throttleFn = myThrottle(print, 1000, { leading: false });

let inter = setInterval(() => {
    if (count < 20) {
        throttleFn('inter');
        count++;
    } else {
        clearInterval(inter);
    }
}, 200);

setTimeout(() => {
    console.log('------');
    count = 0;
    inter = setInterval(() => {
        if (count < 20) {
            throttleFn('inter');
            count++;
        } else {
            clearInterval(inter);
        }
    }, 200);
}, 6000);
