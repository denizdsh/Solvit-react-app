import { port } from './config';
import * as api from './api';

const url = `${port}/topics`;

export async function createTopic(body) {
    try {
        return await api.post(url, body)
    } catch (err) {
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

export async function getTopicsByAuthor(author) {
    try {
        return await api.get(`${url}/u/${author}`);
    } catch (err) {
        throw err;
    }
}
export async function getTopicById(id) {
    try {
        return await api.get(`${url}/${id}`);
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

export async function getSavedTopics() {
    try {
        return await api.get(`${url}/c/saved`);
    } catch (err) {
        throw err;
    }
}

export async function likeTopic(id) {
    try {
        return await api.post(`${url}/${id}/like`)
    } catch (err) {
        throw err;
    }
}

export async function dislikeTopic(id) {
    try {
        return await api.post(`${url}/${id}/dislike`)
    } catch (err) {
        throw err;
    }
}