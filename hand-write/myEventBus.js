class EventBus {
    constructor() {
        this.map = new Map();
    }
    on(type, callback) {
        if (this.map.has(type)) {
            this.map.get(type).push(callback);
        } else {
            this.map.set(type, [callback]);
        }
    }
    emit(type) {
        if (this.map.has(type)) {
            this.map.get(type).forEach((callback) => {
                callback();
            });
        }
    }
    once(type, callback) {
        const wrap = () => {
            callback();
            this.remove(type, callback);
        };
        this.on(type, wrap);
    }
    remove(type, callback) {
        if (callback) {
            const cbs = this.map.get(type);
            this.map.set(
                type,
                cbs.filter((cb) => cb !== callback)
            );
        } else {
            this.map.delete(type);
        }
    }
}

const ev = new EventBus();

ev.on('call', () => {
    console.log('call event 1');
});

const cb = () => {
    console.log('events 2');
};

ev.on('call', cb);

ev.on('t1', () => {
    console.log('event t1');
});

ev.emit('call');
ev.emit('t1');
ev.once('once', () => {
    console.log('触发一次');
});
console.log('========');
ev.remove('call', cb);
ev.emit('call');
console.log('=========');
ev.emit('t1');
ev.on('once');
console.log('once ------');
ev.on('once');
