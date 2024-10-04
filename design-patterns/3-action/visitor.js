class Comp {
    accept () {
        console.log('原对象提供方法');
    }
}

class Visitor {
    constructor(source) {
        this.source = source;
    }
    accept () {
        this.source.accept();
    }
    more () {
        console.log('扩展下原方法');
    }
}

const source = new Comp();
const visitor = new Visitor(source);

// 后续只要操作visitor即可，原Comp不修改，visitor扩展了原对象

visitor.accept();
visitor.more();


// =============== 访问者 ========
// 抽象访问者，具体访问者，抽象元素，具体元素，对象结构
class Visitor {
    visitCircle () { }
    visitSquare () { }
}
class Shape {
    accept () { }
}

class Circle extends Shape {
    constructor(radius) {
        this.radius = radius;
    }
    accept (visitor) {
        visitor.visitCircle(this);
    }
    getRadius () {
        return this.radius
    }
}

class Square extends Shape {
    constructor(side) {
        this.side = side;
    }
    accept (visitor) {
        visitor.visitSquare(this);
    }
    getSide () {
        return this.side;
    }
}

class AreaVisitor extends Visitor {
    visitCircle (circle) {
        console.log('计算圆形面积', circle.getRadius());
    }
    visitSquare (square) {
        console.log('计算正方形面积', square.getSide());
    }
}

// 结构对象
class Drawing {
    constructor() {
        this.shapes = [];
    }
    addShape (shape) {
        this.shapes.push(shape);
    }
    removeShape (shape) {
        this.shapes = this.shapes.filter(item => item !== shape);
    }
    accept (visitor) {
        this.shapes.forEach(item => item.accept(visitor));
    }
}

const circle = new Circle(10);
const square = new Square(10);
const visitor1 = new AreaVisitor();

circle.accept(visitor1);
square.accept(visitor1);

// ======

const drawing = new Drawing();
drawing.addShape(circle);
drawing.addShape(square);
drawing.accept(visitor1);

