async function request(method, url, data, accessToken) {
    let domainUrl = 'http://localhost:3030';
    let headers = {};
    if(data !== undefined){
        headers['Content-Type'] = 'application/json';
    }
    if(accessToken !== undefined){
        headers['X-Authorization'] = accessToken;
    }
    
    try{
    let response = await fetch(domainUrl + url, {
        method,
        headers,
        body: JSON.stringify(data)
    });;

    if(response.status === 204){
        return;
    }

    if(response.status === 400){
        throw new Error('Error');
    }
    
    let result = await response.json();

    

    return result;
    } catch {
        throw new Error();
    }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');