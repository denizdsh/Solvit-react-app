import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function modal(Component) {
    const WrapperComponent = (props) => {
        const ref = useRef();
        const location = useLocation();
        const navigate = useNavigate();

        useEffect(() => {
            const path = ['/create', '/edit', '/delete'].filter(x => location.pathname.includes(x))[0];
            const redirect = location.pathname.split(path)[0] || '/';

            const clickOutsideHandler = (e) => {
                const initialInputLoadCheck = e.target.tagName !== 'INPUT' && e.target.tagName !== 'A' && !e.target.classList.contains('edit-btn') && !e.target.classList.contains('fa-pencil-alt');
                const initialLinkLoadCheck = e.target.tagName !== 'A';
                const categoryOptionCheck = !e.target.classList.contains('MuiAutocomplete-option');

                if (initialInputLoadCheck && initialLinkLoadCheck && categoryOptionCheck && ref.current && !ref.current.contains(e.target)) {
                    navigate(redirect);
                }
            }

            document.addEventListener('click', clickOutsideHandler)

            return () => document.removeEventListener('click', clickOutsideHandler)
        })

        return (
            <section className="modal" >
                <section ref={ref} style={{ width: 'fit-content', margin: 'auto' }}>
                    <Component {...props} />
                </section>
            </section>
        )
    }

    return WrapperComponent;
}