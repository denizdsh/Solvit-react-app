import { useEffect, useState } from 'react';
import { isUser } from '../hoc/isAuth';
import { getFollowedTopics } from '../services/topic';
import Topics from './Topics/Topics';

function FollowedTopics() {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const topicsData = await getFollowedTopics();
                setTopics(topicsData);
            } catch (err) {
                console.error(err);
            }
        })();
    })


    return (
        topics.length > 0
            ? <Topics topics={topics} />
            : (
                <section className="no-followed-categories">
                    <p className='no-posts-message'>You haven't followed any categories yet. Would you like to go follow some first?</p>
                </section>
            )
    )
}

export default isUser(FollowedTopics)