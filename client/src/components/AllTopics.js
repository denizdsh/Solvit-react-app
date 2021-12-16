import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getAllTopics } from '../services/topic';

import Topics from './Topics/Topics';
import TopicsHeadingUnderlined from './Topics/TopicsHeadingUnderlined';

export default function AllTopics() {
    const [topics, setTopics] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = {sortby: searchParams.get('sortby'), order: searchParams.get('order')}

    useEffect(() => {
        (async () => {
            const topicsData = await getAllTopics(query);
            setTopics(topicsData);
        })();
    }, [query.sortby, query.order])

    return (
        <Topics topics={topics} CustomHeading={<TopicsHeadingUnderlined title="All topics" />} />
    )
}