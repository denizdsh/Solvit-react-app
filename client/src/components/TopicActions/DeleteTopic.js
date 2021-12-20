import { useNavigate } from 'react-router-dom';

import { isOwner } from '../../hoc/isAuth';
import { useTopic } from '../../hooks/useTopic'

import DialogComponent from '../Common/Dialog/Dialog';

function DeleteTopic() {
    const navigate = useNavigate();
    const { topic, deleteTopicHandler } = useTopic();

    return (
        <DialogComponent onAgree={() => deleteTopicHandler(topic) & navigate('/', { replace: true })} onCancel={() => navigate(-1, { replace: true })} title='Delete confirmation' text={`Are you sure you want to delete topic: ${topic.title}`} />
    )
}

export default isOwner(DeleteTopic);
