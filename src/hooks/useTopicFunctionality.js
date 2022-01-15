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
    }, [isAuthenticated, getRequest])


    const addFunction = async (value) => {
        await addRequest(value);
        
        setState([...state, value]);
    }

    const removeFunction = async (value) => {
        await removeRequest(value);
        
        setState(state.filter(x => x !== value));
    }

    return { state, addFunction, removeFunction };
}