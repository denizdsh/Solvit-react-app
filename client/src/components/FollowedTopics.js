import { useEffect, useState } from 'react';

import { isUser } from '../hoc/isAuth';
import { useTopicFunctionality } from '../hooks/useTopicFunctionality';
import { getFollowedTopics } from '../services/topic';
import { getFollowingCategories, followCategory, unfollowCategory } from '../services/user';

import Topics from './Topics/Topics';

function FollowedTopics() {
    const [topics, setTopics] = useState([]);
    const fcState = useTopicFunctionality(getFollowingCategories, followCategory, unfollowCategory);

    useEffect(() => {
        (async () => {
            try {
                const topicsData = await getFollowedTopics();
                setTopics(topicsData);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [fcState.state])

    const fc = { categories: fcState.state, addFollowingCategory: fcState.addFunction, removeFollowingCategory: fcState.removeFunction };
    
    const props = { showCreateTopicLink: topics.length > 0, message: "You haven't followed any categories yet. Would you like to go follow some first?", fc };
    return (
        <Topics topics={topics} {...props} />
    )
}

export default isUser(FollowedTopics)