// 外观角色，子系统，客户角色
class Circle {
    draw() {
        console.log('画圆圈');
    }
}
class Rectangle {
    draw() {
        console.log('画方形');
    }
}
class Square {
    draw() {
        console.log('画正方形');
    }
}

class FacadeDraw {
    constructor() {
        this.circle = new Circle();
        this.rectangle = new Rectangle();
        this.square = new Square();
    }
    drawCircle() {
        this.circle.draw();
    }
    drawRectangle() {
        this.rectangle.draw();
    }
    drawSquare() {
        this.square.draw();
    }
}

const drawApi = new FacadeDraw();
drawApi.drawCircle();
drawApi.drawSquare();
