function myAjax(url, method = 'get', option) {
    // return new Promise(resolve, reject)
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onreadystatechange = function () {
        // 4完成
        if (this.readyState === 4) {
            if (this.status === 200) {
                // resolve(this.response)
            } else {
                // reject(new Error(this.statusText))
            }
        }
    };
    xhr.onerror = function () {
        // reject(new Error(this.statusText))
    };

    xhr.responseType = 'json';
    xhr.setRequestHeader('accept', 'application/json');

    xhr.send('params');
}
