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
    notify(from, to, info) {
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
    setMediator(med) {
        this.mediator = med;
    }
    toGirl() {
        this.mediator.notify('y', 'x', '找女朋友');
    }
    accept(msg) {
        console.log('对方信息:', msg, ' = 接受对方');
    }
}

class P2 {
    constructor() {
        this.gender = 'x';
        this.name = '小红';
    }
    setMediator(med) {
        this.mediator = med;
    }
    toBoy() {
        this.mediator.notify('x', 'y', '找男朋友');
    }
    accept(msg) {
        console.log('对方信息:', msg, ' = 接受对方');
    }
}

const p1 = new P1();
const p2 = new P2();
const m = new Mediator(p1, p2);

p1.toGirl();
p2.toBoy();
