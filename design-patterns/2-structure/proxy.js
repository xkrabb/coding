/**
 * 代理模式，介于访问者和目标对象之间，返回一个新的代理对象。
 *
 */

class Target {
    constructor() {}
    request() {
        console.log('目标对象发送请求。。。');
    }
}

class ProxyReq {
    constructor(target) {
        this.isLogin = false;
        this.target = target;
    }
    request() {
        if (this.isLogin) {
            this.target.request();
        } else {
            console.log('请先登录');
        }
    }
    doLogin() {
        console.log('登录成功');
        this.isLogin = true;
    }
}

const tar = new Target();
const proxyIns = new ProxyReq(tar);
proxyIns.request();

proxyIns.doLogin();

proxyIns.request();
