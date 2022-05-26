// LazyMan(“Hank”)输出:
// Hi! This is Hank!

// LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~

// LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// LazyMan(“Hank”).eat(“supper”).sleepFirst(5)输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat suppe

class Man {
    constructor(name) {
        this.queue = [];
        this.queue.push(() => {
            console.log('hi this is ', name);
            this.next();
        });
        setTimeout(() => {
            this.next();
        }, 0);
    }
    next() {
        if (this.queue.length > 0) {
            this.queue.shift()();
        }
    }
    eat(type) {
        this.queue.push(() => {
            console.log('eat ', type);
            this.next();
        });
        return this;
    }
    sleepWrap(timeout, pre) {
        const cb = () => {
            setTimeout(() => {
                console.log('weak up after ', timeout, 's');
                this.next();
            }, timeout * 1000);
        };
        if (pre) {
            this.queue.unshift(cb);
        } else {
            this.queue.push(cb);
        }
    }
    sleep(timeout) {
        this.sleepWrap(timeout, false);
        return this;
    }
    sleepFirst(timeout) {
        this.sleepWrap(timeout, true);
        return this;
    }
}

const LazyMan = (name) => new Man(name);
LazyMan('hank').eat('supper').sleepFirst(5);
