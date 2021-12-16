import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useTopicContext } from '../../hooks/useTopicContext'
import { isOwner } from '../../hoc/isAuth';
import { deleteTopic } from '../../services/topic'

function DeleteTopic() {
    const { topic } = useTopicContext();

    useEffect(() => {
        (async () => {
            try {
                await deleteTopic(topic._id, topic._ownerId);
            } catch (err) {
                console.log(err);
                return (
                    <Navigate to={-1} replace />
                )
            }
        })();
    }, [topic._id, topic._ownerId])

    return (
        <Navigate to="/" replace />
    )
}

export default isOwner(DeleteTopic);
