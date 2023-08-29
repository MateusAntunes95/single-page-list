function ajaxRequest(url, method, data = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const responseObj = JSON.parse(xhr.responseText);
                        resolve(responseObj);
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    reject(xhr.statusText);
                }
            }
        };

        xhr.open(method, url, true);

        const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

        xhr.setRequestHeader('X-CSRF-TOKEN', csrfToken);

        if (method === 'POST' && data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
    });
}
