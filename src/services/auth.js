import { port } from './config';
import * as api from './api';

export async function login(email, password) {
    try {
        return await api.post(`${port}/login`, { email, password });
    } catch (err) {
        throw err;
    }
}

export async function register(email, username, password, imageUrl) {
    try {
        return await api.post(`${port}/register`, { email, username, password, imageUrl })
    } catch (err) {
        throw err;
    }
}