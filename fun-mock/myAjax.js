const myAjax = function (url, method = 'get') {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    reject(new Error(this.responseText));
                }
            }
        };

        xhr.onerror = function () {
            reject(new Error(this.statusText));
        };

        xhr.setRequestHeader();
        xhr.responseType = '';

        xhr.send();
    });
};
