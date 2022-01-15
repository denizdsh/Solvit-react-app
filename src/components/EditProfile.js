import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUser } from '../hoc/isAuth';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { editProfile } from '../services/user'
import * as auth from '../services/auth';

function EditProfile() {
    const [passwordType, setPasswordType] = useState('password');
    const navigate = useNavigate();
    const { user, logout, login } = useAuth();
    const { showNotification } = useNotification();

    const passwordTypeHandler = () => {
        const isHidden = passwordType === 'password';
        setPasswordType(isHidden ? 'text' : 'password');
    }

    const editProfileHandler = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const { username, imageUrl, password } = Object.fromEntries(form);

        const urlRegexp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

        try {
            if (imageUrl && !imageUrl.match(urlRegexp)) {
                throw new Error({ message: 'Image must be a valid URL' })
            }

            const data = await editProfile({ username, imageUrl }, password);

            const email = user.email;
            logout();
            const userData = await auth.login(email, password);
            login(userData);

            navigate('/', { replace: true });
            showNotification(`Successfully edited profile`, 'success')
        } catch (err) {
            showNotification(err.message, 'warning')
        }
    }

    const eyeIcon = <i className="fas fa-eye"></i>;
    const crossedEyeIcon = <i className="far fa-eye-slash"></i>;
    return (
        <section className="auth-section">
            <i className={`fab fa-js-square auth-top-left-icon auth-bg-icon`} />
            <span className={`csharp-icon auth-top-right-icon auth-bg-icon`}>C#</span>

            <div className="auth-title-holder">
                <h1 className="auth-title">Edit Profile</h1>
                <div className="line-under-title"></div>
            </div>
            <form method="POST" className="auth-form" onSubmit={editProfileHandler}>

                <div>
                    <label className="auth-form-label" htmlFor="username">Username</label>
                    <input className="auth-form-input" type="username" id="username" name="username" defaultValue={user.username} placeholder={user.username} />
                </div>

                <div>
                    <label className="auth-form-label auth-form-imageUrl-label" htmlFor="imageUrl">Avatar icon</label>
                    <input className="auth-form-input" type='url' id="imageUrl" name="imageUrl" defaultValue={user.imageUrl} placeholder={user.imageUrl || 'www.image.com'} />
                    <a className="link-to-imgur" href="https://imgur.com/upload" target="_blank" rel="noreferrer">You can upload your image here...</a>
                </div>
                <div>
                    <article className="auth-form-password-label-wrap">
                        <label className="auth-form-label" htmlFor="password">Password <span className="required-asterisk">*</span></label>
                        <article className="auth-form-see-password" onClick={passwordTypeHandler}>
                            {passwordType === 'password'
                                ? crossedEyeIcon
                                : eyeIcon}
                        </article>
                    </article>
                    <input className="auth-form-input" type={passwordType} id="password" name="password" placeholder='Please confirm your identity' />
                </div>
                <div>
                    <input className="auth-form-submit" type="submit" value='Commit' />
                </div>
            </form>

            <i className={`fab fa-python auth-bottom-left-icon auth-bg-icon`} />
            <i className={`fab fa-java auth-bottom-right-icon auth-bg-icon`} />
        </section>
    )
}

export default isUser(EditProfile);