class BaseHouse {
    constructor() {}
    getDesc() {
        console.log('毛坯房');
    }
}

class Paint {
    constructor(house) {
        this.house = house;
    }
    getDesc() {
        this.house.getDesc();
        console.log('刷墙');
    }
}

class Furniture {
    constructor(house) {
        this.house = house;
    }
    getDesc() {
        this.house.getDesc();
        console.log('家具');
    }
}

let house = new BaseHouse();
house = new Paint(house);
house = new Furniture(house);

house.getDesc();
