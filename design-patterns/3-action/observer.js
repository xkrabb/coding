class Subject {
    constructor() {
        this.map = [];
    }
    attach (sub) {
        this.map.push(sub);
    }
    detach () {
        this.map = [];
    }
    notify (price) {
        this.map.forEach((sub) => sub.update(price));
    }
}

class Subscribe1 {
    constructor(subject) {
        this.subject = subject;
    }
    update (price) {
        console.log(price < 100 ? '产品更新了，订阅者1准备开车去买' : '超过100块，不买了');
    }
}

class Subscribe2 {
    constructor(subject) {
        this.subject = subject;
    }
    update (price) {
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


// 主题，具体主题，观察者，具体观察者

class Subject {
    constructor() { }
    subscribe (observer) { }
    unsubscribe (observer) { }
    notify () { }
}

// 可以做更多处理
class ConcreteSubject extends Subject {
    constructor() {
        super();
        this.observers = [];
    }
    subscribe (observer) {
        this.observers.push(observer);
    }
    unsubscribe (observer) {
        this.observers = this.observers.filter((item) => item !== observer);
    }
    notify (msg) {
        this.observers.forEach((observer) => observer.update(msg));
    }
}

class Observer {
    update () { }
}

class User extends Object {
    constructor(name) {
        this.name = name
    }
    update (msg) {
        console.log('用户', msg, '收到更新通知');
    }
}

const broadcast = new ConcreteSubject();
const user1 = new User('张三');
const user2 = new User('李四');
const user3 = new User('王五');
subject.subscribe(user1);
subject.subscribe(user2);
subject.subscribe(user3);

subject.notify('更新了');