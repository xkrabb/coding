// 抽象，扩展抽象，实现，具体实现。多维度对象，如图形有颜色和形状维度
class InterDrawAPI {
    drawCircle() {
        new Error('接口，需要子类实现');
    }
}

class RedCircle extends InterDrawAPI {
    drawCircle(r, x, y) {
        console.log('红色圈，半径：', r, ' 原点：', x, ',', y);
    }
}

class GreenCircle extends InterDrawAPI {
    drawCircle(r, x, y) {
        console.log('绿色圈，半径：', r, ' 原点：', x, ',', y);
    }
}

class InterShape {
    draw() {
        new Error('接口，需要子类实现');
    }
}

class Circle extends InterShape {
    setApi(api) {
        this.drawApi = api;
    }
    draw(r, x, y) {
        this.drawApi.drawCircle(r, x, y);
    }
}

// 实例动态设置组合，实现绘制
const api1 = new RedCircle();
const api2 = new GreenCircle();
const cir = new Circle();
cir.setApi(api1);
cir.draw(10, 0, 0);
cir.setApi(api2);
cir.draw(1, 10, 10);
