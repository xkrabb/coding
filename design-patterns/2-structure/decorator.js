class BaseHouse {
    constructor() { }
    getDesc () {
        console.log('毛坯房');
    }
}

class Paint {
    constructor(house) {
        this.house = house;
    }
    getDesc () {
        this.house.getDesc();
        console.log('刷墙');
    }
}

class Furniture {
    constructor(house) {
        this.house = house;
    }
    getDesc () {
        this.house.getDesc();
        console.log('家具');
    }
}

let house = new BaseHouse();
house = new Paint(house);
house = new Furniture(house);

house.getDesc();


//  ======= 装饰器 =====

class Produce {
    getPrice () {
        return 100;
    }
}

class ProduceDiscountDecorator {
    constructor(produce) {
        this.produce = produce;
    }
    getPrice () {
        return this.produce.getPrice() * 0.8;
    }
}

class ProduceTaxDecorator {
    constructor(produce) {
        this.produce = produce;
    }
    getPrice () {
        return this.produce.getPrice() + 10;
    }
}

// 原价
const price = new Produce()
// 打折价
const discountPrice = new ProduceDiscountDecorator(price);
// 加税价
const taxPrice = new ProduceTaxDecorator(discountPrice);