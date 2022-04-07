class Product1 {
    constructor() {
        console.log('产品p1');
    }
}

class Product2 {
    constructor() {
        console.log('产品p2');
    }
}

// 简单方便；新增产品时候，会对工厂修改，不符合开闭原则
class SimpleFactory {
    static getProduct(type) {
        if (type === 1) {
            return new Product1();
        } else if (type === 2) {
            return new Product2();
        } else {
            new Error('没有对应产品');
        }
    }
}

SimpleFactory.getProduct(1);
SimpleFactory.getProduct(2);
