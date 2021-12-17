import { useContext } from "react"
import { TopicContext } from "../contexts/TopicContext"

export const useTopic = () => useContext(TopicContext);