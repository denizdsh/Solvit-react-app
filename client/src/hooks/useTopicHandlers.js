import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { likeTopic, dislikeTopic } from '../services/topic';

export const useTopicHandlers = (topic, fc, st, isAuthenticated = false, user) => {
    const [hasFollowed, setHasFollowed] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasSaved, setHasSaved] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            setHasFollowed(false);
            return;
        }
        let hf = ((fc?.categories) || (fc?.state))?.includes(topic?.category);

        setHasFollowed(hf);

    }, [fc, user])

    useEffect(() => {
        (async () => {
            if (!isAuthenticated) {
                return;
            }

            let hl = topic?.likes?.includes(user._id);

            setHasLiked(hl);
        })()
    }, [topic, user])

    useEffect(() => {
        (async () => {
            if (!isAuthenticated) {
                return;
            }

            let hs = ((st?.savedTopics) || (st?.state))?.includes(topic?._id);

            setHasSaved(hs);
        })()
    }, [st, user])

    const followCategoryHandler = async () => {
        if (isAuthenticated) {
            await (fc.addFollowingCategory || fc.addFunction)(topic.category);
        } else {
            navigate('/login');
        }
    }
    const unfollowCategoryHandler = async () => {
        if (isAuthenticated) {
            await (fc.removeFollowingCategory || fc.removeFunction)(topic.category);
        } else {
            navigate('/login');
        }
    }

    const likeTopicHandler = async () => {
        if (isAuthenticated) {
            console.log('like');
            await likeTopic(topic._id);
            setHasLiked(topic.likes.includes(user._id))
        } else {
            navigate('/login');
        }
    }

    const dislikeTopicHandler = async () => {
        if (isAuthenticated) {
            console.log('dislike')
        } else {
            navigate('/login');
        }
    }

    const saveTopicHandler = async () => {
        if (isAuthenticated) {
            await (st.addSavedTopic || st.addFunction)(topic._id);
        } else {
            navigate('/login');
        }
    }

    const unsaveTopicHandler = async () => {
        if (isAuthenticated) {
            await (st.removeSavedTopic || st.removeFunction)(topic._id);
        } else {
            navigate('/login');
        }
    }


    return {
        hasFollowed,
        hasLiked,
        hasSaved,
        followCategoryHandler,
        unfollowCategoryHandler,
        likeTopicHandler,
        dislikeTopicHandler,
        saveTopicHandler,
        unsaveTopicHandler
    }
}