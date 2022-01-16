class Comp {
    accept() {
        console.log('原对象提供方法');
    }
}

class Visitor {
    constructor(source) {
        this.source = source;
    }
    accept() {
        this.source.accept();
    }
    more() {
        console.log('扩展下原方法');
    }
}

const source = new Comp();
const visitor = new Visitor(source);

// 后续只要操作visitor即可，原Comp不修改，visitor扩展了原对象

visitor.accept();
visitor.more();
