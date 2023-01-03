import { API_URL } from './config';
import * as api from './api';

export async function login(email, password) {
    try {
        return await api.post(`${API_URL}/login`, { email, password });
    } catch (err) {
        throw err;
    }
}

export async function register(email, username, password, imageUrl) {
    try {
        return await api.post(`${API_URL}/register`, { email, username, password, imageUrl })
    } catch (err) {
        throw err;
    }
}