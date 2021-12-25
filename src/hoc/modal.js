import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import DialogComponent from '../components/Common/Dialog/Dialog';

export default function modal(Component) {
    const WrapperComponent = (props) => {
        const [showDialog, setShowDialog] = useState(false);
        const ref = useRef();
        const location = useLocation();
        const navigate = useNavigate();

        const path = ['/create', '/edit', '/delete'].filter(x => location.pathname.includes(x))[0];
        const redirect = location.pathname.split(path)[0] || '/';
        useEffect(() => {
            const clickOutsideHandler = (e) => {
                const initialInputLoadCheck = e.target.tagName !== 'INPUT' && e.target.tagName !== 'A' && !e.target.classList.contains('edit-btn') && !e.target.classList.contains('fa-pencil-alt');
                const initialLinkLoadCheck = e.target.tagName !== 'A';
                const categoryOptionCheck = !e.target.classList.contains('MuiAutocomplete-option');
                const categoryCrossCheck = !e.target.classList.contains('MuiSvgIcon-root');
                const dialogCheck = !e.target.classList.contains('MuiPaper-root');
                const dialogBtnCheck = !e.target.classList.contains('MuiButton-root');
                if (initialInputLoadCheck && initialLinkLoadCheck && categoryOptionCheck && categoryCrossCheck && dialogCheck && dialogBtnCheck && ref.current && !ref.current.contains(e.target)) {
                    setShowDialog(true);
                }
            }

            document.addEventListener('click', clickOutsideHandler)

            return () => document.removeEventListener('click', clickOutsideHandler)
        }, [])
        const hideHandler = () => {
            console.log('hide')
            setShowDialog(false);
            console.log(showDialog)
        }
        const isCommentsSpinnerModal = props.modalType === 'comments-spinner';
        const isSpinnerModal = props.modalType === 'spinner'
        return (
            <section className={`modal${isCommentsSpinnerModal ? ' comments-spinner-modal' : ''}`} >
                <section ref={ref} style={{ width: 'fit-content', margin: 'auto' }}>
                    {
                        isSpinnerModal ?
                            <Component {...props} />
                            : <>
                                {showDialog
                                    && <DialogComponent title='Cancel confirmation' text='Are you sure you want to cancel this action?' agreeText='Continue' cancelText='Cancel' onAgree={hideHandler} onCancel={() => navigate(redirect)} />}
                                <Component {...props} />
                            </>
                    }
                </section>
            </section>
        )
    }

    return WrapperComponent;
}