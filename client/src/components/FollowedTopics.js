import { useEffect, useState } from 'react';

import { isUser } from '../hoc/isAuth';
import { getFollowedTopics } from '../services/topic';
import { getFollowingCategories, followCategory, unfollowCategory } from '../services/user';

import Topics from './Topics/Topics';

function FollowedTopics() {
    const [topics, setTopics] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const categoriesData = await getFollowingCategories();
                setCategories(categoriesData);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const topicsData = await getFollowedTopics();
                setTopics(topicsData);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [categories])

    const addFollowingCategory = async (category) => {
        setCategories([...categories, category]);

        await followCategory(category);
    }

    const removeFollowingCategory = async (category) => {
        setCategories(categories.filter(c => c !== category));

        await unfollowCategory(category);
    }
    
    const fc = { categories, addFollowingCategory, removeFollowingCategory };
    const props = { showCreateTopicLink: topics.length > 0, message: "You haven't followed any categories yet. Would you like to go follow some first?", fc };
    return (
        <Topics topics={topics} {...props} />
    )
}

export default isUser(FollowedTopics)