import { api } from "./api";

export async function viewEscola() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/escola/media', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getEscola(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/escola/busca', data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function delEscola(data) {
    const accessToken = sessionStorage.getItem('token');
    //console.log('put /escola/del')
    //console.log(data)
    const result = await api.put(`/escola/del`, data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function putEscola(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/escola/put`, data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function crtEscola(data) {
    const accessToken = sessionStorage.getItem('token');
    //console.log(data)
    const result = await api.post('/escola/crt', data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
