import { useState } from 'react';

import './Auth.css'
import { Link } from 'react-router-dom';
// <i class="fab fa-react"></i>

export default function Auth({ type, onSubmit }) {
    const [passwordType, setPasswordType] = useState('password');

    const passwordTypeHandler = () => {
        const isHidden = passwordType === 'password';
        setPasswordType(isHidden ? 'text' : 'password');
    }

    const eyeIcon = <i className="fas fa-eye"></i>;
    const crossedEyeIcon = <i className="far fa-eye-slash"></i>;

    const isLogin = type === 'Login';
    return (
        <section className="auth-section">
            <div className="auth-title-holder">
                <h1 className="auth-title">{type}</h1>
                <div className="line-under-title"></div>
            </div>
            <form method="POST" className="auth-form" onSubmit={onSubmit}>
                <div>
                    <label className="auth-form-label" htmlFor="email">Email:</label>
                    <input className="auth-form-input" type="email" id="email" name="email" placeholder="john@doe.com" />
                </div>
                <div>
                    <article className="auth-form-password-label-wrap">
                        <label className="auth-form-label" htmlFor="password">Password:</label>
                        <article className="auth-form-see-password" onClick={passwordTypeHandler}>
                            {passwordType === 'password'
                                ? crossedEyeIcon
                                : eyeIcon}
                        </article>
                    </article>
                    <input className="auth-form-input" type={passwordType} id="password" name="password" placeholder={isLogin ? '' : 'at least 6 characters'} />
                </div>
                {isLogin ||
                    <div>
                        <article className="auth-form-password-label-wrap">
                            <label className="auth-form-label" htmlFor="repassword">Repeat password:</label>
                            <article className="auth-form-see-password" onClick={passwordTypeHandler}>
                                {passwordType === 'password'
                                    ? crossedEyeIcon
                                    : eyeIcon}
                            </article>
                        </article>
                        <input className="auth-form-input" type={passwordType} id="repassword" name="repassword" placeholder={'same as the one above'} />
                    </div>
                }
                <div>
                    <input className="auth-form-submit" type="submit" value={type} />
                    <Link className="link-to-other-auth" to={isLogin ? '/register' : '/login'}>
                        {isLogin ? "Don't have an account yet?" : "Already have an account?"}
                    </Link>
                </div>
            </form>
        </section>
    )
}