import { port } from './config';
import * as api from './api';

const userUrl = `${port}/u`;
const userActionUrl = `${port}/user-action`;

export const getFollowingCategories = async () => {
    return await api.get(`${userUrl}/me/following-categories`);
}
export const getCardTopicUserData = async () => {
    return await api.get(`${userUrl}/me/topic-user-data`);
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