import { isOwner } from '../../hoc/isAuth';
import { useTopic } from '../../hooks/useTopic';
import { editTopic } from '../../services/topic';
import Spinner from '../Spinner/Spinner';

import TopicForm from "../TopicForm/TopicForm"

function EditTopic() {
    const { topic } = useTopic();
    return (
        <TopicForm title="Edit Topic" topicAction={editTopic} topic={topic} />
    )
}

export default isOwner(EditTopic);