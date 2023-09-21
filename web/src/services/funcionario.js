import { api } from "./api";

export async function viewFuncionario() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/funcionario/media', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getFuncionario(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/funcionario/busca', data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function delFuncionario(data) {
    const accessToken = sessionStorage.getItem('token');
    //console.log('put /funcionario/del')
    //console.log(data)
    const result = await api.put(`/funcionario/del`, data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function putFuncionario(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/funcionario/put`, data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function crtFuncionario(data) {
    const accessToken = sessionStorage.getItem('token');
    //console.log(data)
    const result = await api.post('/funcionario/crt', data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
