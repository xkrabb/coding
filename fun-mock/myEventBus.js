function myEvent() {
    const events = new Map();
    const addEvent = function (type, fn) {
        if (events.has(type)) {
            events.set(type, [...events.get(type), fn]);
        } else {
            events.set(type, [fn]);
        }
    };
    const tiger = function (type) {
        if (events.has(type)) {
            events.get(type).forEach((fn) => {
                fn.call(this);
            });
        }
    };
    const removeEvent = function (type, fn) {
        if (events.has(type)) {
            if (fn) {
                const cbs = events.get(type).filter((cb) => cb !== fn);
                events.set(type, cbs);
            } else {
                events.set(type, []);
            }
        }
    };
    const clear = function () {
        events.clear();
    };
    return { events, tiger, addEvent, removeEvent, clear };
}

const ev = myEvent();

ev.addEvent('call', () => {
    console.log('call event 1');
});

const cb = () => {
    console.log('events 2');
};

ev.addEvent('call', cb);

ev.addEvent('t1', () => {
    console.log('event t1');
});

ev.tiger('call');
ev.tiger('t1');
console.log('========');
ev.removeEvent('call', cb);
ev.tiger('call');
console.log('=========');
ev.clear();
ev.tiger('t1');

// on, off, emit, once
