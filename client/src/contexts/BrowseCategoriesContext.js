import { createContext, useState } from "react";

export const BrowseCategoriesContext = createContext();

export function BrowseCategoriesProvider({ children }) {
    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(oldState => !oldState);
    }

    return (
        <BrowseCategoriesContext.Provider value={{ show, toggleShow }}>
            {children}
        </BrowseCategoriesContext.Provider>
    )
}