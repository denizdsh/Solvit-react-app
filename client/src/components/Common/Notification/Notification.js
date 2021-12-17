import { useCallback, useEffect, useState } from 'react';

import { useNotification } from '../../../hooks/useNotification';

import './Notification.css'
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';

export default function Notification() {
    const { notification, show, closeNotification } = useNotification();
    const [transition, setTransition] = useState();

    const TransitionRight = useCallback((props) => {
        return <Slide {...props} className={notification.severity} direction="right">
            <Alert severity={notification.severity} onClose={closeNotification}>{notification.message}</Alert>
        </Slide>;
    }, [notification, closeNotification])

    useEffect(() => {
        setTransition(() => TransitionRight);
    }, [TransitionRight])

    return (
        <div>
            <Snackbar
                open={show}
                onClose={closeNotification}
                autoHideDuration={5000}
                TransitionComponent={transition}
            />
        </div>
    );
}
