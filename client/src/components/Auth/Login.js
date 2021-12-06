import { useContext } from "react"
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext"

import * as auth from '../../services/auth';

import Auth from "./Auth"
export default function Login() {
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(form);

        const userData = await auth.login(email, password);
        login(userData);

        navigate('/');
    }

    return (
        <Auth type="Login" onSubmit={loginHandler} />
    )
}