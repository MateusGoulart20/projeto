import { api } from "./api";

export async function getMerendeiras() {
    const result = await api.get('/merendeiras');
    return result;
}

export async function deleteMerendeira(id) {
    const result = await api.delete(`/merendeira/${id}`);
    return result;
}

export async function updateMerendeira(data) {
    const result = await api.put(`/merendeira/${data.id}`, {
        nome: data.nome,
    });
    return result;
}

export async function createMerendeira(data) {
    const result = await api.post('/merendeira', {
        nome: data.nome,
    });
    return result;
}
