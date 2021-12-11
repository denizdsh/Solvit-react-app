import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function modal(Component) {
    const WrapperComponent = (props) => {
        const ref = useRef();
        const location = useLocation();
        const navigate = useNavigate();

        useEffect(() => {
            console.log(location.pathname);
            const path = ['/create', '/edit', '/delete'].filter(x => location.pathname.includes(x))[0];
            const redirect = location.pathname.split(path)[0] || '/';

            const clickOutsideHandler = (e) => {
                const initialLoadCheck = e.target.tagName !== 'INPUT';
                const categoryOptionCheck = !e.target.classList.contains('MuiAutocomplete-option');

                if (initialLoadCheck && categoryOptionCheck && ref.current && !ref.current.contains(e.target)) {
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