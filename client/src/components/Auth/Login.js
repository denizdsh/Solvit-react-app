import { useNavigate } from "react-router";

import { useAuth } from "../../hooks/useAuth";
import { useNotification } from '../../hooks/useNotification';
import * as auth from '../../services/auth';

import Auth from "./Auth"

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const loginHandler = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(form);

        try {
            const userData = await auth.login(email, password);
            login(userData);

            navigate('/', { replace: true });
            showNotification(`Successfully logged in as ${userData.username}`, 'info')
        } catch (err) {
            showNotification(err.message, 'warning')
        }
    }

    return (
        <Auth type="Login" onSubmit={loginHandler} />
    )
}