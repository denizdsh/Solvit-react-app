import { useEffect, useState } from 'react';

export const useTopicFunctionality = (getRequest, addRequest, removeRequest, isAuthenticated = true) => {
    const [state, setState] = useState([]);

    useEffect(() => {
        if (isAuthenticated) {
            (async () => {
                try {
                    const result = await getRequest();
                    setState(result);
                } catch (err) {
                    console.error(err);
                }
            })()
        }
    }, [])


    const addFunction = async (value) => {
        setState([...state, value]);

        await addRequest(value);
    }

    const removeFunction = async (value) => {
        setState(state.filter(x => x !== value));

        await removeRequest(value);
    }

    return { state, addFunction, removeFunction };
}