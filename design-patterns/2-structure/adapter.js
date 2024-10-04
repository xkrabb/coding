class Adaptee1 {
    show () {
        console.log('两脚插头');
    }
}

class Adaptee2 {
    display () {
        console.log('三脚插头');
    }
}

class ShowAdapter {
    show () {
        new Adaptee2().display();
    }
}
// 对已经存在的对象进行兼容处理
// 传递适配器实例，这样就可以不用修改函数体内调用方法
function instanceShow (instance) {
    instance.show();
}

instanceShow(new Adaptee1());
instanceShow(new ShowAdapter());
