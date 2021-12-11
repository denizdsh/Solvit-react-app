import { useEffect, useState } from 'react';
import { getFollowedTopics } from '../services/topic';
import Topics from './Topics/Topics';

export default function FollowedTopics() {
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
            : <p>You haven't followed any catogies yet.</p>
    )
}