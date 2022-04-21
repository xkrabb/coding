console.log('1');

setTimeout(function () {
    console.log('2');
    Promise.resolve().then(function () {
        console.log('3');
    });
    new Promise(function (resolve) {
        console.log('4');
        resolve();
    }).then(function () {
        console.log('5');
    });
}, 100);
Promise.resolve().then(function () {
    console.log('6');
});
new Promise(function (resolve) {
    console.log('7');
    resolve();
}).then(function () {
    console.log('8');
});

setTimeout(function () {
    console.log('9');
    Promise.resolve().then(function () {
        console.log('10');
    });
    new Promise(function (resolve) {
        console.log('11');
        resolve();
    }).then(function () {
        console.log('12');
    });
});
