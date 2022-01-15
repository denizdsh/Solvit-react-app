import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { isUser } from '../hoc/isAuth';
import { useTopicFunctionality } from '../hooks/useTopicFunctionality';
import { useCategories } from '../hooks/useCategories';
import { useNotification } from '../hooks/useNotification';
import { getFollowedTopics } from '../services/topic';
import { getFollowingCategories, followCategory, unfollowCategory } from '../services/user';

import BrowseCategories from './BrowseCategories/BrowseCategories';
import Topics from './Topics/Topics';

function FollowedTopics() {
    const [topics, setTopics] = useState();
    const [searchParams] = useSearchParams();
    const fcState = useTopicFunctionality(getFollowingCategories, followCategory, unfollowCategory);
    const { show, showCategories, hideCategories } = useCategories();
    const { showNotification } = useNotification();
    const query = { sortby: searchParams.get('sortby'), order: searchParams.get('order') }

    useEffect(() => {
        (async () => {
            try {
                const topicsData = await getFollowedTopics(query);

                if (topicsData.length === 0) {
                    showCategories();
                }

                setTopics(topicsData);
            } catch (err) {
                setTopics([]);
                console.error(err);
                showNotification(err.message, 'warning')
            }
        })();


    }, [fcState.state, query.sortby, query.order])

    useEffect(() => {
        return () => {
            hideCategories();
        }
    }, [])

    const fc = { categories: fcState.state, addFollowingCategory: fcState.addFunction, removeFollowingCategory: fcState.removeFunction };
    
    const props = { showCreateTopicLink: topics?.length > 0, message: fc.categories.length === 0 ? 'You haven\'t followed any categories yet.' : 'No posts in followed categories.', fc };
    return (
        <>
            {show && <BrowseCategories fc={fc} />}
            <Topics topics={topics} {...props} showBrowseCategories={true} />
        </>
    )
}

export default isUser(FollowedTopics)