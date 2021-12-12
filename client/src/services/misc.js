import { port } from './config';
import * as api from './api';

export const getUserImageByUsername = async (username) => {
    return await api.get(`${port}/u/${username}/image`)
}