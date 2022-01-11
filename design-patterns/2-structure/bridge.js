/**
 * 桥链，将抽象和具体实现分离，解耦
 *
 */

class INS1 {
    constructor() {
        console.log('ins1 开始组装');
    }
    setColor() {
        console.log('red');
    }
    setType() {
        console.log('big');
    }
    getResult() {
        this.setColor();
        this.setType();
    }
}
class INS2 {
    constructor() {
        console.log('ins2 开始组装');
    }
    setColor() {
        console.log('blue');
    }
    setType() {
        console.log('small');
    }
    getResult() {
        this.setColor();
        this.setType();
    }
}

new INS1().getResult();
new INS2().getResult();

// ========= 改写成桥链 =======
console.log('=============== bridge ==================');
class Color {
    constructor(color) {
        this.color = color;
    }
    show() {
        console.log('color is ', this.color);
    }
}
class Type {
    constructor(type) {
        this.type = type;
    }
    show() {
        console.log('type is ', this.type);
    }
}

class BridgeProduct {
    constructor(color, type) {
        console.log('桥链产品组装');
        this.color = new Color(color);
        this.type = new Type(type);
    }
    getResult() {
        this.color.show();
        this.type.show();
    }
}

new BridgeProduct('blue', 'big').getResult();
new BridgeProduct('red', 'small').getResult();
