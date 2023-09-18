import { api } from "./api";

export async function viewDepartamento() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/departamento/media', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getDepartamento(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/departamento/busca', data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function delDepartamento(data) {
    const accessToken = sessionStorage.getItem('token');
    console.log('put /departamento/del')
    console.log(data)
    const result = await api.put(`/departamento/del`, data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function putDepartamento(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/departamento/put`, data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function crtDepartamento(data) {
    const accessToken = sessionStorage.getItem('token');
    console.log(data)
    const result = await api.post('/departamento/crt', data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
