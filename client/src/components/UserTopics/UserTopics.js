import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { getTopicsByAuthor } from '../../services/topic';
import Topics from '../Topics/Topics';
import UserTopicsHeading from './UserTopicsHeading';

export default function UserTopics() {
    const [topics, setTopics] = useState();
    const { user } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = { sortby: searchParams.get('sortby'), order: searchParams.get('order') }
    let error;

    useEffect(() => {
        (async () => {
            try {
                const topicsData = await getTopicsByAuthor(user, query);
                setTopics(topicsData);
            } catch (err) {
                console.error(err);
                error = err.message;
                navigate(-1, { replace: true });
            }
        })();
    }, [user, query.sortby, query.order])


    return (
        <Topics topics={topics} CustomHeading={<UserTopicsHeading user={user} />} showCreateTopicLink={false} message={`${user} hasn't posted yet.`} />
    )
}