function SuperType(name) {
    this.name = name;
    this.color = ['red', 'green', 'blue'];
}

SuperType.prototype.sayName = function () {
    console.log('name is ', this.name);
};

// 1 组合继承：常用继承方式，instanceOf和isPrototypeOf均可用；但是SuperType构造函数调用2次
function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}

SubType.prototype = new SuperType();
// 在继承之后加方法
SubType.prototype.sayAge = function () {
    console.log('age is ', this.age);
};

const sub = new SubType('xx', 23);
sub.sayName();
sub.sayAge();

// 2 原型式继承，等效 Object.create()
function create(proto) {
    function F() {}
    F.prototype = proto;
    return new F();
}

// 3 组合寄生式
function inherit(subType, superType) {
    const prototype = create(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
    return subType;
}

inherit(SubType, SuperType);

inheritIns = new SubType('YY', 11);
inheritIns.sayName();
