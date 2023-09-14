import { api } from "./api";

export async function get() {
    const result = await api.get('/view/funcionario');
    return result;
}

export async function del(data) {
    const result = await api.delete(`/control/funcionario`,{
        //data
    });
    return result;
}

export async function put(data) {
    const result = await api.put(`/control/funcionario`, {
        nome: data.nome,
    });
    return result;
}

export async function crt(data) {
    const result = await api.post('/control/funcionario', {
        nome: data.nome,
    });
    return result;
}
