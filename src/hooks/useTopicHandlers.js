import { useEffect, useState } from 'react';
import { useNotification } from './useNotification';
import { likeTopic, dislikeTopic } from '../services/topic';

export const useTopicHandlers = (topic, fc, st, isAuthenticated = false, user) => {
    const [hasFollowed, setHasFollowed] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasSaved, setHasSaved] = useState(false);
    const [likes, setLikes] = useState(0);
    const { showNotification } = useNotification();

    useEffect(() => {
        if (!isAuthenticated) {
            setHasFollowed(false);
            return;
        }
        let hf = ((fc?.categories) || (fc?.state))?.includes(topic?.category);

        setHasFollowed(hf);

    }, [fc, isAuthenticated, topic?.category])

    useEffect(() => {
        (async () => {
            let l = topic?._likesCount;
            setLikes(l);

            if (!isAuthenticated) {
                return;
            }

            let hl = topic?.likes?.includes(user._id);
            setHasLiked(hl);
        })()
    }, [topic, isAuthenticated, user])

    useEffect(() => {
        (async () => {
            if (!isAuthenticated) {
                return;
            }

            let hs = ((st?.savedTopics) || (st?.state))?.includes(topic?._id);

            setHasSaved(hs);
        })()
    }, [st, isAuthenticated, topic._id])

    const followCategoryHandler = async () => {
        if (isAuthenticated) {
            await (fc.addFollowingCategory || fc.addFunction)(topic.category);
            showNotification(`Followed c/${topic.category}`, 'info');
        } else {
            showNotification('_auth-warning');
        }
    }
    const unfollowCategoryHandler = async () => {
        if (isAuthenticated) {
            await (fc.removeFollowingCategory || fc.removeFunction)(topic.category);
            showNotification(`Unfollowed c/${topic.category}`, 'info');
        } else {
            showNotification('_auth-warning');
        }
    }

    const likeTopicHandler = async () => {
        if (isAuthenticated) {
            console.log('like');
            const likesData = await likeTopic(topic._id);
            setLikes(likesData.length);
            setHasLiked(likesData.includes(user._id));
        } else {
            showNotification('_auth-warning');
        }
    }

    const dislikeTopicHandler = async () => {
        if (isAuthenticated) {
            console.log('dislike')
            const likesData = await dislikeTopic(topic._id);
            setLikes(likesData.length);
            setHasLiked(likesData.includes(user._id));
        } else {
            showNotification('_auth-warning');
        }
    }

    const saveTopicHandler = async () => {
        if (isAuthenticated) {
            await (st.addSavedTopic || st.addFunction || null)(topic._id);
            showNotification(`Saved post: ${topic.title}`, 'info');
        } else {
            showNotification('_auth-warning');
        }
    }

    const unsaveTopicHandler = async () => {
        if (isAuthenticated) {
            await (st.removeSavedTopic || st.removeFunction || null)(topic._id);
            showNotification(`Unsaved post: ${topic.title}`, 'info');
        } else {
            showNotification('_auth-warning');
        }
    }


    return {
        hasFollowed,
        hasLiked,
        hasSaved,
        likes,
        followCategoryHandler,
        unfollowCategoryHandler,
        likeTopicHandler,
        dislikeTopicHandler,
        saveTopicHandler,
        unsaveTopicHandler
    }
}