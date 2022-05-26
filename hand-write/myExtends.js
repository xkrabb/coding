function Parent() {
    this.name = 'parent';
    console.log(this.name);
}
Parent.prototype.say = function () {
    console.log('my name is ', this.name);
};

// 原型继承：原型对象所有实例共享
function Child() {}
Child.prototype = new Parent();

// 构造函数：只能继承属性，方法继承不了
function Child2() {
    Parent.call(this);
}

// 组合: 父构造执行2次
function Child2() {
    Parent.call(this);
}
Child2.prototype = new Parent();
Child2.prototype.constructor = Child2;

// 组合优化
function Child3() {
    Parent.call(this);
}
Child3.prototype = Parent.prototype;

// 组合优化
function Child4() {
    Parent.call(this);
}
Child4.prototype = Object.create(Parent.prototype);
Child4.prototype.constructor = Child4;
