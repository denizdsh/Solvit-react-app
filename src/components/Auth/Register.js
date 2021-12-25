import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../../hooks/useNotification";
import * as auth from '../../services/auth';


import Auth from "./Auth"
export default function Register() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const registerHandler = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const [email, username, password, repassword, imageUrl] = Object.values(Object.fromEntries(form)).map(x => x.trim());

        const urlRegexp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
        const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let error = '';
        if (password !== repassword) {
            error += 'Passwords don\'t match.';
            console.error('Passwords don\'t match.');
        }

        if (!email || !username || !password || !repassword) {
            error = 'All fields are required (except avatar icon).';
            console.error('All fields are required. (except avatar icon)');
        }

        if (email && !email.match(emailRegexp)) {
            error += '\tEmail is not valid.';
            console.error('tEmail is not valid.');
        }

        if (imageUrl && !imageUrl.match(urlRegexp)) {
            error += '\tImage url is not valid.';
            console.error('Image url is not valid');
        }

        if (!error) {
            try {
                const userData = await auth.register(email, username, password, imageUrl);
                login(userData);

                navigate('/', { replace: true });
                showNotification(`Successfully registered as ${userData.username}`, 'success')
            } catch (err) {
                showNotification(err.message, 'warning')
            }
        } else showNotification(error, 'error')


    }

    return (
        <Auth type="Register" onSubmit={registerHandler} />
    )
}