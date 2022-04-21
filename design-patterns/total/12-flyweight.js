// 抽象享元，具体享元，非享元，享元工厂
class Circle {
    constructor(color) {
        this.color = color;
        console.log('绘圆实例创建, color: ', color);
    }
    setXY(x, y) {
        this.x = x;
        this.y = y;
    }
    setR(r) {
        this.r = r;
    }
    draw() {
        console.log('绘制原点在:', this.x, ',', this.y, ' 半径是', this.r, '的', this.color, '圆圈');
    }
}

// 享元工厂，相同颜色工具共享画笔
class ShapeFactory {
    constructor() {
        this.colorMap = {};
    }
    getCircleTool(color) {
        if (!this.colorMap[color]) {
            this.colorMap[color] = new Circle(color);
        }
        return this.colorMap[color];
    }
}

const colorList = ['red', 'blue', 'green'];
const factory = new ShapeFactory();
for (let i = 0; i < 10; i++) {
    const randomNum = Math.floor(Math.random() * 10) % 3;
    const tool = factory.getCircleTool(colorList[randomNum]);
    tool.setXY(randomNum, randomNum);
    tool.setR(randomNum * 10);
    tool.draw();
}
