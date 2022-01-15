import { Routes, Route } from 'react-router';

import { useAuth } from '../../hooks/useAuth';
import { useTopicFunctionality } from '../../hooks/useTopicFunctionality';
import { getFollowingCategories, followCategory, unfollowCategory, getSavedTopicsIds, saveTopic, unsaveTopic } from '../../services/user';

import './Topics.css';
import TopicCard from './TopicCard';
import Aside from './Aside';
import CreateTopicLink from './CreateTopicLink';
import CreateTopic from '../TopicActions/CreateTopic';
import Spinner from '../Common/Spinner/Spinner';
import BrowseCategoriesAside from '../BrowseCategories/BrowseCategoriesAside';

export default function Topics({ topics, CustomHeading, showCreateTopicLink = true, showAside = true, showBrowseCategories = false, message = 'No topics yet. Be the first one to post one!', fc, st }) {
    const { isAuthenticated, user } = useAuth();

    const fcState = useTopicFunctionality(getFollowingCategories, followCategory, unfollowCategory, isAuthenticated);
    const stState = useTopicFunctionality(getSavedTopicsIds, saveTopic, unsaveTopic, isAuthenticated);

    if (!fc) {
        fc = { categories: fcState.state, addFollowingCategory: fcState.addFunction, removeFollowingCategory: fcState.removeFunction };
    }

    if (!st) {
        st = { savedTopics: stState.state, addSavedTopic: stState.addFunction, removeSavedTopic: stState.removeFunction };
    }

    return (
        <>
            {showCreateTopicLink &&
                <Routes>
                    <Route path="create" element={<CreateTopic />} />
                </Routes>}
            <section className="content">
                <aside>
                    {showBrowseCategories && <BrowseCategoriesAside />}
                    {(showAside && topics?.length > 0) && <Aside />}
                </aside>
                <section className="topics">
                    {CustomHeading ? CustomHeading : <></>}
                    {showCreateTopicLink && <CreateTopicLink />}
                    {topics
                        ? topics.length > 0
                            ? topics.map(topic => <TopicCard topic={topic} key={topic._id} isAuthenticated={isAuthenticated} user={user} fc={fc} st={st} />)
                            : <p className='no-posts-message'>{message}</p>
                        : <Spinner modalType='spinner' />}
                </section>
            </section>
        </>
    )
}