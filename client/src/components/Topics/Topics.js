import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getFollowingCategories, followCategory, unfollowCategory, getSavedTopicsIds, saveTopic, unsaveTopic } from '../../services/user';

import './Topics.css';
import TopicCard from './TopicCard';
import Aside from './Aside';
import CreateTopicLink from './CreateTopicLink';
import CreateTopic from '../CreateTopic/CreateTopic';

export default function Topics({ topics, CustomHeading, showCreateTopicLink = true, showAside = true, message = 'No topics yet. Be the first one to post one!', fc, st }) {
    const [followingCategories, setFollowingCategories] = useState([]);
    const [savedTopics, setSavedTopics] = useState([]);
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            (async () => {
                try {
                    const categoriesData = await getFollowingCategories();
                    setFollowingCategories(categoriesData);
                } catch (err) {
                    console.error(err);
                }
            })()
        }
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            (async () => {
                try {
                    const savedTopicsData = await getSavedTopicsIds();
                    console.log('state', savedTopics);
                    console.log('ids', savedTopicsData)

                    setSavedTopics(savedTopicsData);
                } catch (err) {
                    console.error(err);
                }
            })()
        }
    }, [])

    if (!fc) {
        const addFollowingCategory = async (category) => {
            setFollowingCategories([...followingCategories, category]);

            await followCategory(category);
        }

        const removeFollowingCategory = async (category) => {
            setFollowingCategories(followingCategories.filter(c => c !== category));

            await unfollowCategory(category);
        }

        fc = { categories: followingCategories, addFollowingCategory, removeFollowingCategory };
    }

    if (!st) {
        const addSavedTopic = async (topicId) => {
            setSavedTopics([...savedTopics, topicId]);

            await saveTopic(topicId);
        }

        const removeSavedTopic = async (topicId) => {
            setSavedTopics(savedTopics.filter(t => t !== topicId));

            await unsaveTopic(topicId);
        }

        st = { savedTopics, addSavedTopic, removeSavedTopic };
    }

    return (
        <>
            {showCreateTopicLink &&
                <Routes>
                    <Route path="create" element={<CreateTopic />} />
                </Routes>}
            <section className="content">
                {(showAside && topics.length > 0) && <Aside />}
                <section className="topics">
                    {CustomHeading ? CustomHeading : <></>}
                    {showCreateTopicLink && <CreateTopicLink />}
                    {topics.length > 0
                        ? topics.map(topic => <TopicCard topic={topic} key={topic._id} isAuthenticated={isAuthenticated} user={user} fc={fc} st={st} />)
                        : <p className='no-posts-message'>{message}</p>}
                </section>
            </section>
        </>
    )
}