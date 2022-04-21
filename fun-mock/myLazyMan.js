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

class _LazyMan {
    constructor(name) {
        const init = () => {
            console.log('Hi! This is ', name);
            return this.next();
        };
        this.queue = [init];
        setTimeout(() => {
            this.next();
        }, 0);
    }
    eat(param) {
        this.queue.push(() => {
            console.log('Eat ' + param + ' ~~');
            this.next();
        });
        return this;
    }
    sleepWrapper(time, isFirst) {
        const task = () => {
            setTimeout(() => {
                console.log('Wake up after ' + time);
                this.next();
            }, time * 1000);
        };
        if (isFirst) {
            this.queue.unshift(task);
        } else {
            this.queue.push(task);
        }
    }
    sleep(time) {
        this.sleepWrapper(time, false);
        return this;
    }
    sleepFirst(time) {
        this.sleepWrapper(time, true);
        return this;
    }
    next() {
        if (this.queue.length > 0) {
            this.queue.shift()();
        }
    }
}

const LazyMan = (p) => new _LazyMan(p);

// LazyMan('Hank');
// LazyMan('Hank').sleep(2).eat('dinner');
// LazyMan('Hank').eat('dinner').eat('supper');
LazyMan('Hank').eat('supper').sleepFirst(3);
