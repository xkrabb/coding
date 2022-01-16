class Subject {
    constructor() {
        this.map = [];
    }
    attach(sub) {
        this.map.push(sub);
    }
    detach() {
        this.map = [];
    }
    notify(price) {
        this.map.forEach((sub) => sub.update(price));
    }
}

class Subscribe1 {
    constructor(subject) {
        this.subject = subject;
    }
    update(price) {
        console.log(price < 100 ? '产品更新了，订阅者1准备开车去买' : '超过100块，不买了');
    }
}

class Subscribe2 {
    constructor(subject) {
        this.subject = subject;
    }
    update(price) {
        console.log(price < 10 ? '产品更新了，订阅者2准备走路去买' : '穷，超过10块不买了');
    }
}

const subject = new Subject();
const sub1 = new Subscribe1(subject);
const sub2 = new Subscribe2(subject);

subject.attach(sub1);
subject.attach(sub2);

// 发布价格通知
subject.notify(5);
subject.notify(50);
subject.notify(120);

subject.detach(sub2);
subject.notify(99);
