import { port } from './config';
import * as api from './api';

export async function login(email, password) {
    try {
        return await api.post(port + '/login', { email, password });
    } catch (err) {
        //TODO: custom error pop-up
        console.error(err.message);
    }
}

export async function register(email, password, imageUrl) {
    try {
        return await api.post(port + '/register', { email, password, imageUrl })
    } catch (err) {
        //TODO: custom error pop-up
        console.error(err.message);
    }
}