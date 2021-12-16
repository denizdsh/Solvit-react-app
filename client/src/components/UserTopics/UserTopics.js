import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTopicsByAuthor } from '../../services/topic';
import Topics from '../Topics/Topics';
import UserTopicsHeading from './UserTopicsHeading';

export default function UserTopics() {
    const [topics, setTopics] = useState([]);
    const { user } = useParams();

    useEffect(() => {
        (async () => {
            try {
                const topicsData = await getTopicsByAuthor(user);
                setTopics(topicsData);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [user])


    return (
        <Topics topics={topics} CustomHeading={<UserTopicsHeading user={user} />} showCreateTopicLink={false} message={`${user} hasn't posted yet.`} />
    )
}