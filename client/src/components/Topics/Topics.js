import { useSearchParams } from 'react-router-dom';

import './Topics.css';
import TopicCard from './TopicCard';
import Aside from './Aside';
import CreateTopicLink from './CreateTopicLink';
import CreateTopic from '../CreateTopic/CreateTopic';
import { Routes, Route } from 'react-router';

export default function Topics({ topics, CustomHeading, showCreateTopicLink = true, showAside = true, }) {
    return (
        <>
            <Routes>
                <Route path="create" element={<CreateTopic />} />
            </Routes>
            <section className="content">
                {(showAside && topics.length > 0) && <Aside />}
                <section className="topics">
                    {showCreateTopicLink && <CreateTopicLink />}
                    {CustomHeading ? <CustomHeading /> : <></>}
                    {topics.length > 0
                        ? topics.map(topic => <TopicCard topic={topic} key={topic._id} />)
                        : <p className='no-posts-message'>No topics yet. Be the first one to post one!</p>}
                </section>
            </section>
        </>
    )
}