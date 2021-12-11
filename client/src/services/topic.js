import { port, categories } from './config';
import * as api from './api';

const url = `${port}/topics`;

export async function createTopic(body) {
    try {
        return await api.post(url, body)
    } catch (err) {
        console.error(err);
        throw err;
    }
}