import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import { getTopicsByCategory } from '../services/topic';
import { categories } from '../services/config';
import Topics from './Topics/Topics';
import TopicsHeadingUnderlined from './Topics/TopicsHeadingUnderlined';

export default function CategoryTopics() {
    const [topics, setTopics] = useState([]);
    const { category } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if (!categories.map(x => x.toLocaleLowerCase()).includes(category) && category !== 'csharp') {
            navigate('/all', { replace: true });
        }

        (async () => {
            try {
                const topicsData = await getTopicsByCategory(category);
                setTopics(topicsData);
            } catch (err) {
                navigate('/all', { replace: true });
            }
        })();

    }, [category, navigate])
    const headingTitle = category === 'csharp' ? 'C#' : categories.find((x) => x.toLocaleLowerCase() === category);
    return (
        <Topics topics={topics} CustomHeading={<TopicsHeadingUnderlined title={headingTitle} />} />
    )
}