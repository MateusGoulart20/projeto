import { api } from "./api";

export async function get() {
    const result = await api.get('/view/funcionario',);
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
    console.log('funçao crt(): ');
    console.log(data);
    const result = await api.post('/registro', data);
    sessionStorage.setItem('token', JSON.stringify(result.data));
    return result;
}

export async function lgn(data) {
    console.log('funçao lgn(): ');
    console.log(data);
    const result = await api.post('/login', data);
    console.log('result')
    console.log(result)
    console.log('result.data')
    console.log(result.data)
    sessionStorage.setItem('token', JSON.stringify(result.data));
    return result;
}

export async function conexao(){
    const result = await api.get('/');
    //return result;
}