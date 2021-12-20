import { useState, forwardRef } from 'react';

import './Dialog.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});

export default function DialogComponent({ onAgree, onCancel, title, text, show = true, agreeText = 'OK', cancelText = 'Cancel' }) {
    const [open, setOpen] = useState(show);

    const handleClose = () => {
        setOpen(false);
        if (onCancel) {
            onCancel();
        }
    };

    const handleAgree = () => {
        setOpen(false);
        if (onAgree) {
            onAgree();
            console.log(onAgree)
        }
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{cancelText}</Button>
                    <Button onClick={handleAgree}>{agreeText}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
