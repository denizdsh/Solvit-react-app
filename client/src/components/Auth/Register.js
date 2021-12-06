import { useContext } from "react"
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext"

import * as auth from '../../services/auth';

import Auth from "./Auth"
export default function Register() {
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const registerHandler = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const { email, password, repassword, imageUrl } = Object.fromEntries(form);

        if (password !== repassword) {
            //TODO: custrom error pop-up
            alert('Passwords don\'t match.');
            console.error('Passwords don\'t match.');
            return;
        }

        const userData = await auth.register(email, password, imageUrl);
        login(userData);

        navigate('/');
    }

    return (
        <Auth type="Register" onSubmit={registerHandler} />
    )
}