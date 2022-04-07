// 产品角色，抽象建造者，具体建造者，指挥者
class ProductComp {
    constructor() {
        console.log('产品类实例化');
    }
    // name 可以是产品部分的实例
    setDisplay(name) {
        this.display = name;
    }
    setCpu(name) {
        this.cpu = name;
    }
    setCase(name) {
        this.caseName = name;
    }
    show() {
        console.log('组装完成: 显示器是', this.display, ', cpu是', this.cpu, ', 机箱是', this.caseName);
    }
}

class AbstractBuilder {
    constructor() {}
    buildPart1(part1) {
        new Error('接口需要被子类覆写');
    }
    buildPart2(part2) {
        new Error('接口需要被子类覆写');
    }
    buildPart3(part3) {
        new Error('接口需要被子类覆写');
    }
}

class Builder extends AbstractBuilder {
    constructor() {
        super();
        this.comp = new ProductComp();
    }
    buildPart1(display) {
        this.comp.setDisplay(display);
    }

    buildPart2(cpu) {
        this.comp.setCpu(cpu);
    }

    buildPart3(caseName) {
        this.comp.setCase(caseName);
    }
}

class Director {
    constructor() {
        this.builder = new Builder();
    }
    getProduct() {
        this.builder.buildPart1('x牌显示器');
        this.builder.buildPart2('y牌cpu');
        this.builder.buildPart3('z牌主机箱');
        return this.builder.comp;
    }
}

const dir = new Director().getProduct();
dir.show();
