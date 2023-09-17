import { api } from "./api";

export async function get(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/view/escola',{data}, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getView() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/view/escola', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}


export async function del(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/food/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function put(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/food/${data.id}`, {
        nome: data.nameFood,
        unidadeMedida: data.unity
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function crt(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/food', {
        nome: data.nameFood,
        unidadeMedida: data.unity
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
