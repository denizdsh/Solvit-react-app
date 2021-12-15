async function request(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message);
        }
        try {
            return await response.json();
        } catch (err) {
            return response;
        }
    } catch (err) {
        // TODO: show custom error pop-up
        console.error(err.message);
        throw err;
    }
}

function getOptions(method = 'get', body) {
    const options = {
        method,
        headers: {}
    };

    const accessToken = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (accessToken) options.headers['X-Authorization'] = accessToken;

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

export async function get(url) {
    return await request(url, getOptions());
}

export async function post(url, body) {
    return await request(url, getOptions('post', body));
}
export async function put(url, body) {
    return await request(url, getOptions('put', body));
}
export async function patch(url, body) {
    return await request(url, getOptions('patch', body));
}
export async function del(url) {
    return await request(url, getOptions('delete'));
}