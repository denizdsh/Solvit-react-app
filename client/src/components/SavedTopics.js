import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { isUser } from "../hoc/isAuth";
import { useTopicFunctionality } from "../hooks/useTopicFunctionality";
import { useNotification } from "../hooks/useNotification";
import { getSavedTopics } from "../services/topic";
import { getSavedTopicsIds, saveTopic, unsaveTopic } from "../services/user";

import TopicsHeadingUnderlined from "./Topics/TopicsHeadingUnderlined";
import Topics from "./Topics/Topics";

function SavedTopics() {
    const [topics, setTopics] = useState();
    const [searchParams] = useSearchParams();
    const stState = useTopicFunctionality(getSavedTopicsIds, saveTopic, unsaveTopic);
    const { showNotification } = useNotification();
    const query = { sortby: searchParams.get('sortby'), order: searchParams.get('order') }

    useEffect(() => {
        (async () => {
            try {
                const topicsData = await getSavedTopics(query);
                setTopics(topicsData)
            } catch (err) {
                setTopics([]);
                console.error(err);
                showNotification(err.message, 'warning');
            }
        })()
    }, [stState.state, query.sortby, query.order])


    const st = { savedTopics: stState.state, addSavedTopic: stState.addFunction, removeSavedTopic: stState.removeFunction };

    const props = { showCreateTopicLink: false, CustomHeading: <TopicsHeadingUnderlined title={'Saved topics'} />, message: 'No saved topics yet. You can save topics and check them later.', st }
    return (
        <Topics topics={topics} {...props} message="You haven't saved any topics yet" />
    )
}

export default isUser(SavedTopics);