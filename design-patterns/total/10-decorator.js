// 抽象构件，具体构件，抽象装饰，具体装饰
class AbstractComp {
    operate() {
        new Error('需要覆写');
    }
}

class Comp extends AbstractComp {
    operate() {
        console.log('构建操作方法。。。');
    }
}

class CompDecorator extends AbstractComp {
    constructor() {
        super();
        this.comp = new Comp();
    }
    otherWork() {
        console.log('装饰器的其他工作');
    }
    operate() {
        this.otherWork();
        this.comp.operate();
    }
}

const comp1 = new Comp();
const comp2 = new CompDecorator();
comp1.operate();
console.log('----------');
comp2.operate();
