import { useState, createContext, useCallback } from "react";
import { Link } from "react-router-dom";

export const NotificationContext = createContext();

const types = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info'
}

export const NotificationProvider = ({ children }) => {
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({ message: '', severity: types.error });

    const showNotification = useCallback((message, severity = types.error) => {
        if (message === '_auth-warning') {
            message = (<>You have to be <Link to='/login'>logged in</Link> for this action</>)
        }
        setNotification({ message, severity });
        setShow(true);
    })

    const closeNotification = useCallback(() => setShow(false));

    return (
        <NotificationContext.Provider value={{ notification, show, showNotification, closeNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}