import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { isUser } from '../hoc/isAuth';
import { useTopicFunctionality } from '../hooks/useTopicFunctionality';
import { useCategories } from '../hooks/useCategories';
import { getFollowedTopics } from '../services/topic';
import { getFollowingCategories, followCategory, unfollowCategory } from '../services/user';
import BrowseCategories from './BrowseCategories/BrowseCategories';

import Topics from './Topics/Topics';

function FollowedTopics() {
    const [topics, setTopics] = useState();
    const fcState = useTopicFunctionality(getFollowingCategories, followCategory, unfollowCategory);
    const { show } = useCategories();
    const [searchParams] = useSearchParams();
    const query = { sortby: searchParams.get('sortby'), order: searchParams.get('order') }

    useEffect(() => {
        (async () => {
            try {
                const topicsData = await getFollowedTopics(query);
                setTopics(topicsData);
            } catch (err) {
                setTopics([]);
                console.error(err);
            }
        })();
    }, [fcState.state, query.sortby, query.order])

    const fc = { categories: fcState.state, addFollowingCategory: fcState.addFunction, removeFollowingCategory: fcState.removeFunction };

    const props = { showCreateTopicLink: topics?.length > 0, message: "You haven't followed any categories yet. Would you like to go follow some first?", fc };
    return (
        <>
            {show && <BrowseCategories fc={fc} />}
            <Topics topics={topics} {...props} showBrowseCategories={true} message={<BrowseCategories fc={fc} />} />
        </>
    )
}

export default isUser(FollowedTopics)