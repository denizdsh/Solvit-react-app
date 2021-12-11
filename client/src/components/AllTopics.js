import { useEffect, useState } from 'react';
import { getAllTopics } from '../services/topic';
import Topics from './Topics/Topics';

export default function AllTopics() {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        (async () => {
            const topicsData = await getAllTopics();
            setTopics(topicsData);
        })();
    }, [])

    return (
        <Topics topics={topics} />
    )
}