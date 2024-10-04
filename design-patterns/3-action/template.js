/**
 * 模板模式， 具有公共步骤或结构，
 * 提供一个结构或流程模板，由子类实现具体
 */

// 模板类

class DrinksTemp {
    step1 () { }
    step2 () { }
    step3 () { }
    step4 () {
        // 公共步骤
        console.log('倒杯')
    }
    work () {
        this.step1();
        this.step2();
        this.step3();
        this.step4()
    }
}

class Cafe extends DrinksTemp {
    constructor() {
        super();
    }
    step1 () {
        console.log('烧开水，磨咖啡');
    }
    step2 () {
        console.log('加茶叶');
    }
    step3 () {
        console.log('热水倒入杯子');
    }
}

class Tea extends DrinksTemp {
    constructor() {
        super();
    }
    step1 () {
        console.log('烧开水');
    }
    step2 () {
        console.log('加入茶叶');
    }
    step3 () {
        console.log('慢慢将热水倒入杯子');
    }
}

new Cafe().work();
new Tea().work();
