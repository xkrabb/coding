/**
 * @global 全局：全局变量太多污染
 */
// config.js
const config = { api: 'https://api.com' };
// utils.js
const utils = {
    request() {
        console.log('request: ', config.api);
    }
};
// main.js
utils.request();

// ===========================================

/**
 * @IIFE IIFE/命名空间 立即执行函数，减少全局变量
 */
// config.js
(function (root) {
    const api = 'https://api.com/iife';
    root.config = {
        request() {
            console.log('request: ', api);
        }
    };
})(window);

// ===========================================

/**
 * @AMD require.js 运行时加载确定依赖；异步
 */
define('./utils', [utils], function (utils) {
    utils.request();
});

// ===========================================

/**
 * @CommonJS2 node服务器端 运行时加载确定依赖；同步
 */
// 引入
const config = require('./config');
// 导出， 相比exports，避免引用被重新赋值
module.exports = {
    request: () => {
        console.log('request: ', config.api);
    }
};

// ===========================================

/**
 * @UMD 模块通用处理
 */
!(function (root, factory) {
    if (typeof exports === 'object' && typeof module === 'object') {
        // CommonJS2
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        exports.myLibName = factory();
    } else {
        // 全局变量
        root.myLibName = factory();
    }
})(window, function () {
    // 模块初始化要执行的代码
});

// ===========================================

/**
 * @ESM es6 module，编译时处理依赖
 * 目前依赖babel处理
 * node使用需要用mjs后缀，或说明 type: module
 */

import { api } from './config.sj';
export const api = 'https://api.com';
const param = '';
export default param;
import('dynamic-import');

/**
 * commonjs 和 esm
 *
 * 同一模块多次加载，只加载一次
 * commonjs 运行时加载；模块是值拷贝；同步
 * esm 编译时加载；模块输出是值的引用；异步
 *
 */
