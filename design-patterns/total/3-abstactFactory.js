// 抽象工厂，具体工厂，抽象产品，具体产品
class TV {
    show() {
        new Error('接口需要被子类覆写');
    }
}

class HairTV extends TV {
    constructor() {
        super();
        console.log('海尔电视机');
    }
    show() {
        console.log('海尔电视机，播放。。。');
    }
}

class TclTV extends TV {
    constructor() {
        super();
        console.log('TCL电视机');
    }
    show() {
        console.log('TCL电视机，播放。。。');
    }
}

class AbstractFactory {
    static getTV() {
        new Error('接口需要被子类覆写');
    }
    // 收音机产品簇 理解用
    static getRadio() {
        new Error('接口需要被子类覆写');
    }
}

// 海尔加工厂
class HairFactory extends AbstractFactory {
    static getTV() {
        return new HairTV();
    }
    static getRadio() {}
}

class TCLFactory extends AbstractFactory {
    static getTV() {
        return new TclTV();
    }
    static getRadio() {}
}

HairFactory.getTV().show();
TCLFactory.getTV().show();
