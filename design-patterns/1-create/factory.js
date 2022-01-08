/**
 * 简单工厂，工厂，抽象工厂
 *
 * 简单工厂 从特定工厂取特定实例；(工厂，抽象产品，具体产品)
 * 工厂 为每个产品指定一个工厂类；（抽象工厂，具体工厂，抽象产品，具体产品）
 * 抽象工厂 在工厂基础上可以生产一类产品；（抽象工厂，具体工厂，抽象产品，具体产品）
 *
 */

// 抽象产品是为了规范产品类里方法名一致，取出实例有相同方法可以调用
class Product1 {
    constructor(name) {
        this.name = name;
    }
    show() {
        console.log('product name is ', this.name);
    }
}

class Product2 {
    constructor(name) {
        this.name = name;
    }
    show() {
        console.log('product name is ', this.name);
    }
}

// ======= simple factory =======
class SimpleFactory {
    // 静态方法或普通方法都可以，在于是否需要new
    static getInstance(type) {
        if (type === 'a') {
            return new Product1(type);
        } else if (type === 'b') {
            return new Product2(type);
        } else {
            return TypeError('no such type product');
        }
    }
}

let p1 = SimpleFactory.getInstance('a');
let p2 = SimpleFactory.getInstance('b');
p1.show();
p2.show();

//  ======== factory ========
class P1Factory {
    static getInstance() {
        return new Product1('1号工厂生产产品1');
    }
}

class P2Factory {
    static getInstance() {
        return new Product2('2号工厂生产产品2');
    }
}

p1 = P1Factory.getInstance();
p2 = P2Factory.getInstance();
p1.show();
p2.show();

// ======== abstract factory =======
class P11 {
    constructor(name) {
        this.name = name;
    }
    show() {
        console.log('product name is ', this.name);
    }
}
class P21 {
    constructor(name) {
        this.name = name;
    }
    show() {
        console.log('product name is ', this.name);
    }
}

class AbsFactory1 {
    create1() {
        return new Product1('抽象工厂1产品1');
    }
    create2() {
        return new P11('抽象工厂1产品1-1');
    }
}

class AbsFactory2 {
    create1() {
        return new Product1('抽象工厂2产品2');
    }
    create2() {
        return new P11('抽象工厂2产品2-1');
    }
}

const f1 = new AbsFactory1();
const f2 = new AbsFactory2();

f1.create1().show();
f1.create2().show();

f2.create1().show();
f2.create2().show();
