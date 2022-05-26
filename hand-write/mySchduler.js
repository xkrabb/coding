//  addTask(1000,"1");addTask(500,"2");addTask(300,"3");addTask(400,"4");
// 最多2个异步并发 2314
class MyScheduler {
    constructor(size) {
        this.max = size;
        this.queue = [];
        this.runningCount = 0;
    }
    addTask(timeout, value) {
        const task = () => {
            setTimeout(() => {
                // 执行结束，任务-1，取下一个任务
                this.runningCount--;
                console.log('value: ', value);
                this.runNext();
            }, timeout);
        };

        this.queue.push(task);
    }
    runNext() {
        if (this.runningCount < this.max && this.queue.length > 0) {
            const task = this.queue.shift();
            this.runningCount++;
            task();
        }
    }
    start() {
        for (let i = 0; i < this.queue.length; i++) {
            if (this.runningCount < this.max) {
                this.runNext();
            }
        }
    }
}

const scheduler = new MyScheduler(2);
scheduler.addTask(1000, '1');
scheduler.addTask(500, '2');
scheduler.addTask(300, '3');
scheduler.addTask(400, '4');
scheduler.start();
