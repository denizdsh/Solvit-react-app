import { useEffect, useState } from "react";

import { isUser } from "../hoc/isAuth";
import { getSavedTopics } from "../services/topic";
import { getSavedTopicsIds, saveTopic, unsaveTopic } from "../services/user";

import TopicsHeadingUnderlined from "./Topics/TopicsHeadingUnderlined";
import Topics from "./Topics/Topics";

function SavedTopics() {
    const [topics, setTopics] = useState([]);
    const [savedTopics, setSavedTopics] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const savedTopicsData = await getSavedTopicsIds();
                setSavedTopics(savedTopicsData)
            } catch (err) {
                console.error(err);
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const topicsData = await getSavedTopics();
                setTopics(topicsData)
            } catch (err) {
                console.error(err);
            }
        })()
    }, [])

    const addSavedTopic = async (topicId) => {
        setSavedTopics([...savedTopics, topicId]);

        await saveTopic(topicId);
    }

    const removeSavedTopic = async (topicId) => {
        setSavedTopics(savedTopics.filter(t => t !== topicId));

        await unsaveTopic(topicId);
    }

    const st = { savedTopics, addSavedTopic, removeSavedTopic };

    const props = { showCreateTopicLink: false, CustomHeading: <TopicsHeadingUnderlined title={'Saved topics'} />, message: 'No saved topics yet. You can save topics and check them later.', st }
    return (
        <Topics topics={topics} {...props} />
    )
}

export default isUser(SavedTopics);