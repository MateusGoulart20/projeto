import { api } from "./api";

export async function get() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    }
    );
    return result;
}

export async function del(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/user/del`, data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function put(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/user/put`, data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function crt(data) {
    const result = await api.post('/registro', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
    sessionStorage.setItem('id', JSON.stringify(result.data.id));
    return result;
}

export async function lgn(data) {
    const result = await api.post('/login', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
    sessionStorage.setItem('id', JSON.stringify(result.data.id));
    return result.data;
}
export async function getSave() {
    const accessToken = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('id');
    const result = await api.put('/user/get', {id:id}, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });    
    return result;
}

