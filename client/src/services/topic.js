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

export async function editTopic(body, id) {
    try {
        return await api.put(`${url}/${id}`, body)
    } catch (err) {
        throw err;
    }
}

export async function deleteTopic(id) {
    try {
        return await api.del(`${url}/${id}`)
    } catch (err) {
        throw err;
    }
}

export async function getAllTopics(query = { sortby: 'date', order: 'asc' }) {
    return await api.get(`${url}?sortBy=${query.sortby}&order=${query.order}`);
}

export async function getTopicsByCategory(category, query = { sortby: 'date', order: 'asc' }) {
    try {
        return await api.get(`${url}/c/${category}?sortBy=${query.sortby}&order=${query.order}`);
    } catch (err) {
        return await getAllTopics();
    }
}

export async function getTopicsByAuthor(author, query = { sortby: 'date', order: 'asc' }) {
    try {
        return await api.get(`${url}/u/${author}?sortBy=${query.sortby}&order=${query.order}`);
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

export async function getFollowedTopics(query = { sortby: 'date', order: 'asc' }) {
    try {
        return await api.get(`${url}/c/following?sortBy=${query.sortby}&order=${query.order}`);
    } catch (err) {
        throw err;
    }
}

export async function getSavedTopics(query = { sortby: 'date', order: 'asc' }) {
    try {
        return await api.get(`${url}/c/saved?sortBy=${query.sortby}&order=${query.order}`);
    } catch (err) {
        throw err;
    }
}

export async function getComments(id) {
    try {
        return await api.get(`${url}/${id}/comments`);
    } catch (err) {
        throw err;
    }
}

export async function postComment(id, body) {
    console.log(id, body)
    try {
        console.log(`${url}/${id}/comments`)
        return await api.post(`${url}/${id}/comments`, { content: body });
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