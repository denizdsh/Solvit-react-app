import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getFollowingCategories, followCategory, unfollowCategory } from '../../services/user';

import './Topics.css';
import TopicCard from './TopicCard';
import Aside from './Aside';
import CreateTopicLink from './CreateTopicLink';
import CreateTopic from '../CreateTopic/CreateTopic';

export default function Topics({ topics, CustomHeading, showCreateTopicLink = true, showAside = true, message = 'No topics yet. Be the first one to post one!', fc }) {
    const [followingCategories, setFollowingCategories] = useState([]);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated && !fc) {
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
    console.log(fc)
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
                        ? topics.map(topic => <TopicCard topic={topic} key={topic._id} isAuthenticated={isAuthenticated} fc={fc} />)
                        : <p className='no-posts-message'>{message}</p>}
                </section>
            </section>
        </>
    )
}