// 抽象主题，真实主题，代理
class AbstractSubject {
    request() {
        new Error('接口需要被子类覆写');
    }
}

class Request {
    request() {
        console.log('访问主题');
    }
}

class ProxyReq {
    constructor() {
        this.realSub = new Request();
    }
    request() {
        if (!this.login) {
            console.log('未登录要先登录');
        } else {
            this.preReq();
            this.realSub.request();
        }
    }
    preReq() {
        console.log('访问前准备工作');
    }
}

const pro = new ProxyReq();
pro.request();
pro.login = true;
pro.request();
