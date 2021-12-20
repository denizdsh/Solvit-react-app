import { useState, createContext, useCallback } from "react";
import { Link } from "react-router-dom";

export const DialogContext = createContext();

const types = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info'
}

export const DialogProvider = ({ children }) => {
    const [show, setShow] = useState(false);
    const [dialog, setDialog] = useState({ message: '', severity: types.error });

    const showDialog = useCallback((message, severity = types.error) => {
        setDialog({ message, severity });
        setShow(true);
    }, [])

    const closeDialog = useCallback(() => setShow(false), []);

    return (
        <DialogContext.Provider value={{ dialog, show, showDialog, closeDialog }}>
            {children}
        </DialogContext.Provider>
    )
}