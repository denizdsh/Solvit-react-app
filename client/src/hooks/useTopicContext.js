import { useContext } from "react"
import { TopicContext } from "../contexts/TopicContext"

export const useTopicContext = () => {
    return useContext(TopicContext);
}