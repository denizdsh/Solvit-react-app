import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import { getTopicsByCategory } from '../services/topic';
import { categories } from '../services/config';
import Topics from './Topics/Topics';
import TopicsHeadingUnderlined from './Topics/TopicsHeadingUnderlined';

export default function CategoryTopics() {
    const [topics, setTopics] = useState([]);
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        const category = params.category;
        if (!categories.map(x => x.toLocaleLowerCase()).includes(category) && category !== 'csharp') {
            navigate('/all');
        }

        (async () => {
            try {
                const topicsData = await getTopicsByCategory(category);
                setTopics(topicsData);
            } catch (err) {
                navigate('/all');
            }
        })();

    }, [params, navigate])
    const headingTitle = params.category === 'csharp' ? 'C#' : categories.find((x) => x.toLocaleLowerCase() === params.category);
    return (
        <Topics topics={topics} CustomHeading={<TopicsHeadingUnderlined title={headingTitle} />} />
    )
}