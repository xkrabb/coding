// 抽象原型，具体原型，访问类

class Cloneable {
    clone() {
        new Error('接口需要被子类覆写');
    }
}

class Robot extends Cloneable {
    constructor() {
        super();
        console.log('机器人1号');
    }
    walk() {
        console.log('机器人走路');
    }
    clone() {
        // TODO 克隆实例过程
        return { ...this };
    }
}

const rob = new Robot();
const robCopy = rob.clone();
rob.walk();
// robCopy.walk();
console.log(rob === robCopy);
