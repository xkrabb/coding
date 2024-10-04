/**
 * 中介者让原本对象间通信，通过中介者管理
 * 呈星状结构
 *
 */
class Mediator {
    constructor(p1, p2) {
        console.log('实例化媒婆，并指定给介绍对象人群');
        this.p1 = p1;
        this.p2 = p2;
        // 同时需要让他们把媒婆指定为自己，也可以在对象内自己指定
        this.p1.setMediator(this);
        this.p2.setMediator(this);
    }
    notify (from, to, info) {
        // 异性交互才传递
        if (from === 'y' && to === 'x') {
            this.p2.accept(info);
        }
        if (from === 'x' && to === 'y') {
            this.p1.accept(info);
        }
    }
}

class P1 {
    constructor() {
        this.gender = 'y';
        this.name = '小明';
    }
    setMediator (med) {
        this.mediator = med;
    }
    toGirl () {
        this.mediator.notify('y', 'x', '找女朋友');
    }
    accept (msg) {
        console.log('对方信息:', msg, ' = 接受对方');
    }
}

class P2 {
    constructor() {
        this.gender = 'x';
        this.name = '小红';
    }
    setMediator (med) {
        this.mediator = med;
    }
    toBoy () {
        this.mediator.notify('x', 'y', '找男朋友');
    }
    accept (msg) {
        console.log('对方信息:', msg, ' = 接受对方');
    }
}

const p1 = new P1();
const p2 = new P2();
const m = new Mediator(p1, p2);

p1.toGirl();
p2.toBoy();


// 中介者，具体中介者，同事类，具体同事类
// 不同于订阅者，中介者一般是单向的一一通知，而订阅者是广播形式

class Mediator {
    notify () { }
}

class ChatRoot extends Mediator {
    constructor() {
    }
    setUser1 (user) {
        this.user1 = user
    }
    setUser2 (user) {
        this.user2 = user
    }
    notify (from, to, msg) {
        if (from === 'user1' && to === 'user2') {
            this.user2.accept(msg);
        }
        if (from === 'user2' && to === 'user1') {
            this.user1.accept(msg);
        }
    }
}

class Colleague {
    constructor() { }
    setMediator (mediator) {
        this.mediator = mediator;
    }
    send (to, msg) {
        this.mediator.notify(this.name, to, msg);
    }
    accept (msg) { }
}

class User1 extends Colleague {
    constructor() {
        super();
        this.name = 'user1';
    }
    accept (msg) {
        console.log('user1 接受消息', msg);
    }
}

class User2 extends Colleague {
    constructor() {
        super();
        this.name = 'user2';
    }
    accept (msg) {
        console.log('user2 接受消息', msg);
    }
}

const chatRoot = new ChatRoot();
const user1 = new User1();
const user2 = new User2();

// 加入聊天室
user1.setMediator(chatRoot);
user2.setMediator(chatRoot);
// 同意加入
chatRoot.setUser1(user1);
chatRoot.setUser2(user2);

user1.send('user2', '你好');
user2.send('user1', '你好');
