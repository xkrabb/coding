/**
 * 责任链上对象具有通用方法；
 * 需要构建自己需要的责任链；
 * 参数在责任链上传递，各部分处理并决定流程是否结束还是往后处理。
 *
 */

class BaseHandle {
    constructor() { }
    setNextHandle (handle) {
        this.nextHandle = handle;
        return handle;
    }
    handle (reqParam) {
        console.log('传递给下一个');
        this.nextHandle?.handle(reqParam);
    }
}

class Approval1 extends BaseHandle {
    constructor() {
        console.log('审批1');
        super();
    }
    handle (day) {
        if (day < 1) {
            console.log('小于1天，组长同意即可，流程结束');
        } else {
            super.handle(day);
        }
    }
}

class Approval2 extends BaseHandle {
    constructor() {
        console.log('审批2');
        super();
    }
    handle (day) {
        if (day < 2) {
            console.log('小于2天，部门领导同意即可，流程结束');
        } else {
            super.handle(day);
        }
    }
}

class Approval3 extends BaseHandle {
    constructor() {
        console.log('审批3');
        super();
    }
    handle (day) {
        if (day > 2) {
            console.log('大于2天，大大领导同意吧，流程结束');
        } else {
            super.handle(day);
        }
    }
}

// 构建责任链
const a1 = new Approval1();
const a2 = new Approval2();
const a3 = new Approval3();

a1.setNextHandle(a2);
a2.setNextHandle(a3);

console.log('==============');
// 调用
a1.handle(0.5);
a1.handle(5);
