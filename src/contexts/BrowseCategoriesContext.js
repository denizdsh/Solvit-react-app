import { createContext, useState } from "react";

export const BrowseCategoriesContext = createContext();

export function BrowseCategoriesProvider({ children }) {
    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(oldState => !oldState);
    }

    const showCategories = () => {
        setShow(true);
    }

    const hideCategories = () => {
        setShow(false);
    }

    return (
        <BrowseCategoriesContext.Provider value={{ show, toggleShow, showCategories, hideCategories }}>
            {children}
        </BrowseCategoriesContext.Provider>
    )
}