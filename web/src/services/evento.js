import { api } from "./api";

export async function viewEvento() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/evento/media', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getEvento(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/evento/busca', data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function delEvento(data) {
    const accessToken = sessionStorage.getItem('token');
    console.log('put /evento/del')
    console.log(data)
    const result = await api.put(`/evento/del`, data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function putEvento(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/evento/put`, data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function crtEvento(data) {
    const accessToken = sessionStorage.getItem('token');
    console.log(data)
    const result = await api.post('/evento/crt', data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
