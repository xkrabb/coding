/**
 * 通过指挥者指挥构造者实例，建造一个完整的产品
 * 指挥者，调用具体一类建造者
 * 建造者，不同建造者负责组装调用不同产品
 *
 * 扩展只需要增加对应狗建造者
 * 
 * 一个产品由多个部分组成，组成逻辑可以由构造器实现
 *
 */

class PA1 {
    constructor() {
        console.log('产品A类，1型号');
    }
}
class PA2 {
    constructor() {
        console.log('产品A类，2型号');
    }
}
class PB1 {
    constructor() {
        console.log('产品B类，1型号');
    }
}
class PB2 {
    constructor() {
        console.log('产品B类，2型号');
    }
}

class BuilderA {
    constructor() {
        console.log('建造者A');
    }
    setA () {
        this.partA = new PA1();
    }
    setB () {
        this.partB = new PB1();
    }
}
class BuilderB {
    constructor() {
        console.log('建造者B');
    }
    setA () {
        this.partA = new PA2();
    }
    setB () {
        this.partB = new PB2();
    }
}

class Director {
    constructor() {
        console.log('开始指挥');
    }
    getBuilder () {
        console.log('指挥生产 建造者A  产品');
        // 输出构造者构建好的产品
        return new BuilderA();
    }
}

const builder = new Director().getBuilder();
builder.setA();
builder.setB();
