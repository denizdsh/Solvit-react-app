import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { useNotification } from '../../hooks/useNotification';
import { getTopicsByAuthor } from '../../services/topic';
import Topics from '../Topics/Topics';
import UserTopicsHeading from './UserTopicsHeading';

export default function UserTopics() {
    const [topics, setTopics] = useState();
    const { user } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const query = { sortby: searchParams.get('sortby'), order: searchParams.get('order') }

    useEffect(() => {
        (async () => {
            try {
                const topicsData = await getTopicsByAuthor(user, query);
                setTopics(topicsData);
            } catch (err) {
                navigate('/', { replace: true });
                showNotification(`${user} is currently struggling to fix one of the many problems in his project, and therefore is unavailable`, 'error')
            }
        })();
    }, [user, query.sortby, query.order, navigate, showNotification])


    return (
        <Topics topics={topics} CustomHeading={<UserTopicsHeading user={user} />} showCreateTopicLink={false} message={`${user} hasn't posted yet.`} />
    )
}