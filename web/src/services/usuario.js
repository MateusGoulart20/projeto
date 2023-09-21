import { api } from "./api";

export async function get() {
    const result = await api.get('/view/funcionario',);
    return result;
}

export async function del(data) {
    //console.log(data)
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
    //console.log('funçao crt(): ');
    //console.log(data);
    const result = await api.post('/registro', data);
    sessionStorage.setItem('token', JSON.stringify(result.data));
    return result;
}

export async function lgn(data) {
    //console.log('funçao lgn(): ');
    //console.log(data);
    const result = await api.post('/login', data);
    //console.log('result')
    //console.log(result)
    //console.log('result.data')
    //console.log(result.data)
    //let aT = result.data.accessToken
    ////console.log(a)
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
    sessionStorage.setItem('id', JSON.stringify(result.data.id));
    //console.log('sucess')
    return result.data;
}
export async function getSave() {
    const accessToken = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('id');
    //console.log('funçao lgn(): ');
    const result = await api.put('/user/get', {id:id}, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    //console.log('result')
    //console.log(result)
    
    return result;
}

