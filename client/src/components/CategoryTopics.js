import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

import { getTopicsByCategory } from '../services/topic';
import { categories } from '../services/config';
import Topics from './Topics/Topics';
import TopicsHeadingUnderlined from './Topics/TopicsHeadingUnderlined';

export default function CategoryTopics() {
    const [topics, setTopics] = useState([]);
    const { category } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const query = {sortby: searchParams.get('sortby'), order: searchParams.get('order')}


    useEffect(() => {
        if (!categories.map(x => x.toLocaleLowerCase()).includes(category) && category !== 'csharp') {
            navigate('/all', { replace: true });
        }

        (async () => {
            try {
                const topicsData = await getTopicsByCategory(category, query);
                setTopics(topicsData);
            } catch (err) {
                navigate('/all', { replace: true });
            }
        })();

    }, [category, navigate, query.sortby, query.order])
    const headingTitle = category === 'csharp' ? 'C#' : categories.find((x) => x.toLocaleLowerCase() === category);
    return (
        <Topics topics={topics} CustomHeading={<TopicsHeadingUnderlined title={headingTitle} />} />
    )
}