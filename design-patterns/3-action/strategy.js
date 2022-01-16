class Strategy1 {
    execute() {
        console.log('选择走路');
    }
}
class Strategy2 {
    execute() {
        console.log('选择骑自行车');
    }
}
class Strategy3 {
    execute() {
        console.log('选择开车');
    }
}

class Context {
    constructor() {
        this.strategy = null;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    doWork() {
        this.strategy.execute();
    }
}

const schedule = new Context();
// 路不远，设置左路策略
schedule.setStrategy(new Strategy1());
schedule.doWork();
