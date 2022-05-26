function myThrottle(fn, wait, options) {
    let timer = null;
    let preTime = 0;
    const tailing = options.tailing !== false;
    const leading = options.leading !== false;
    return (...args) => {
        const now = new Date().getTime();
        if (preTime === 0 && !leading) {
            preTime = now;
        }
        const remaining = wait - (now - preTime);
        if (remaining <= 0 || preTime > now) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            fn(...args);
            preTime = now;
        } else if (!timer && tailing) {
            timer = setTimeout(() => {
                fn(...args);
                timer = null;
                preTime = 0;
            }, remaining);
        }
    };
}
