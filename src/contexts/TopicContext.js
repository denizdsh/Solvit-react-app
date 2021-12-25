import { createContext, useState } from "react";
import { useNotification } from '../hooks/useNotification';
import { deleteTopic } from '../services/topic'

export const TopicContext = createContext();

export function TopicProvider({ children }) {
    const [topic, setTopic] = useState({});
    const { showNotification } = useNotification();

    const provideTopic = (topic) => {
        setTopic(topic);
    }
    const deleteTopicHandler = (topic) => {
        (async () => {
            try {
                await deleteTopic(topic._id, topic._ownerId);
                showNotification(`Successfully deleted post: ${topic.title}`, 'success')
            } catch (err) {
                console.error(err);
                showNotification(err.message, 'success')
            }
        })()
        setTopic({});
    }

    return (
        <TopicContext.Provider value={{ topic, provideTopic, deleteTopicHandler }}>
            {children}
        </TopicContext.Provider>
    )
}