import { API_URL } from './config';
import * as api from './api';

const userUrl = `${API_URL}/u`;
const userActionUrl = `${API_URL}/user-action`;

export const editProfile = async (body, password) => {
    return await api.post(`${API_URL}/edit-profile`, { ...body, password });
}

export const getFollowingCategories = async () => {
    return await api.get(`${userUrl}/me/following-categories`);
}

export const getSavedTopicsIds = async () => {
    return await api.get(`${userUrl}/me/saved-topics`);
}

export const getUserImageByUsername = async (username) => {
    return await api.get(`${userUrl}/${username}/image`)
}

export const followCategory = async (category) => {
    return await api.post(`${userActionUrl}/follow/${category}`);
}

export const unfollowCategory = async (category) => {
    return await api.post(`${userActionUrl}/unfollow/${category}`);
}

export const saveTopic = async (topicId) => {
    return await api.post(`${userActionUrl}/save/${topicId}`)
}

export const unsaveTopic = async (topicId) => {
    return await api.post(`${userActionUrl}/unsave/${topicId}`);
}