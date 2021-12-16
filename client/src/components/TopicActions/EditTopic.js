import { useContext } from 'react';
import { TopicContext } from '../../contexts/TopicContext';

import { isOwner } from '../../hoc/isAuth';
import { editTopic } from '../../services/topic';

import TopicForm from "../TopicForm/TopicForm"

function EditTopic() {
    const { topic } = useContext(TopicContext);
    return (
        <TopicForm title="Edit Topic" topicAction={editTopic} topic={topic} />
    )
}

export default isOwner(EditTopic);