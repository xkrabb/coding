// 模拟接口，接口是用来约定限制的
// 抽象工厂，具体工厂，抽象产品，具体产品
class Product {
    show() {
        new Error('接口需要被子类覆写');
    }
}

class Product1 extends Product {
    constructor() {
        super();
        console.log('产品p1');
    }
    show() {
        console.log('展示1');
    }
}

class Product2 extends Product {
    constructor() {
        super();
        console.log('产品p2');
    }
    show() {
        console.log('展示2');
    }
}

class Factory {
    static getInstance() {
        new Error('接口需要被子类覆写');
    }
}

class P1Factory extends Factory {
    static getInstance() {
        return new Product1();
    }
}

class P2Factory extends Factory {
    static getInstance() {
        return new Product2();
    }
}

// 直接用对应工厂获取实例

P1Factory.getInstance().show();
P2Factory.getInstance().show();
