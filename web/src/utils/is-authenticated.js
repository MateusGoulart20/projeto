import { api } from '../services/api'

export async function isAuthenticated() {
    const accessToken = sessionStorage.getItem('token');
    try {


        return await api.get('/', {
            headers: {
                'Authorization': `Bearer ${JSON.parse(accessToken)}`
            }
        });
    } catch (error) {
        return false;
    }
};
