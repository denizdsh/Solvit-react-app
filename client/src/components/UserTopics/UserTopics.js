import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTopicsByAuthor } from '../../services/topic';
import Topics from '../Topics/Topics';

export default function UserTopics() {
    const [topics, setTopics] = useState([]);
    const { user } = useParams();
    console.log(user);
    useEffect(() => {
        (async () => {
            try {
                const topicsData = await getTopicsByAuthor(user);
                setTopics(topicsData);
            } catch (err) {
                console.error(err);
                alert(err);
            }
        })();
    }, [])


    const UserHeading = () => (
        <span>user</span>
    )
    return (
        <Topics topics={topics} CustomHeading={UserHeading} showCreateTopicLink={false} />
    )
}