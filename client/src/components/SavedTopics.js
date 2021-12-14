import { useEffect, useState } from "react";

import { isUser } from "../hoc/isAuth";
import { useTopicFunctionality } from "../hooks/useTopicFunctionality";
import { getSavedTopics } from "../services/topic";
import { getSavedTopicsIds, saveTopic, unsaveTopic } from "../services/user";

import TopicsHeadingUnderlined from "./Topics/TopicsHeadingUnderlined";
import Topics from "./Topics/Topics";

function SavedTopics() {
    const [topics, setTopics] = useState([]);
    const stState = useTopicFunctionality(getSavedTopicsIds, saveTopic, unsaveTopic);

    useEffect(() => {
        (async () => {
            try {
                const topicsData = await getSavedTopics();
                setTopics(topicsData)
            } catch (err) {
                console.error(err);
            }
        })()
    }, [stState.state])


    const st = { savedTopics: stState.state, addSavedTopic: stState.addFunction, removeSavedTopic: stState.removeFunction };

    const props = { showCreateTopicLink: false, CustomHeading: <TopicsHeadingUnderlined title={'Saved topics'} />, message: 'No saved topics yet. You can save topics and check them later.', st }
    return (
        <Topics topics={topics} {...props} />
    )
}

export default isUser(SavedTopics);