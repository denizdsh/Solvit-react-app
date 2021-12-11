import { port } from './config';
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
export async function getAllTopics() {
    return await api.get(url);
}

export async function getTopicsByCategory(category) {
    try {
        return await api.get(`${url}/c/${category}`);
    } catch (err) {
        return await getAllTopics();
    }
}

export async function getTopicByUserId(userId) {
    try {
        return await api.get(`${url}/u/${userId}`);
    } catch (err) {
        throw err;
    }
}

export async function getFollowedTopics() {
    try {
        return await api.get(`${url}/c/following`);
    } catch (err) {
        throw err;
    }
}