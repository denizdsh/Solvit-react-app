import { createTopic } from '../services/topic';

import TopicForm from "./TopicForm/TopicForm"

export default function CreateTopic(){

    return(
        <TopicForm title="Create Topic" topicAction={createTopic}/>
    )
}