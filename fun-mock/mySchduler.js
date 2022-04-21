//  addTask(1000,"1");addTask(500,"2");addTask(300,"3");addTask(400,"4");
// 最多2个异步并发 2314
class Scheduler {
    constructor(limit = 2) {
        this.maxCount = limit;
        this.queue = [];
        this.runningCount = 0;
    }
    addTask(timeout, param) {
        this.queue.push(
            () =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(param);
                        console.log('parma', param);
                        this.runningCount--;
                        this.next();
                    }, timeout);
                })
        );
    }
    next() {
        if (this.queue.length > 0) {
            this.runningCount++;
            this.queue.shift()();
        }
    }
    startWork() {
        for (let i = 0; i < this.queue.length; i++) {
            if (i < this.maxCount) {
                this.queue.shift()();
            }
        }
    }
}
const s = new Scheduler(2);
s.addTask(1000, '1');
s.addTask(500, '2');
s.addTask(300, '3');
s.addTask(400, '4');
s.startWork();
