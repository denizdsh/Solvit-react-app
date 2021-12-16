import { createContext, useState } from "react";

export const TopicContext = createContext();

export function TopicProvider({ children }) {
    const [topic, setTopic] = useState({});
    const provideTopic = (topic) => {
        setTopic(topic);
    }

    return (
        <TopicContext.Provider value={{ topic, provideTopic }}>
            {children}
        </TopicContext.Provider>
    )
}