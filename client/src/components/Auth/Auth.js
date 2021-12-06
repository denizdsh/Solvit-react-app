import { useState } from 'react';

import './Auth.css'
import { Link } from 'react-router-dom';

export default function Auth({ type, onSubmit }) {
    const [passwordType, setPasswordType] = useState('password');

    const passwordTypeHandler = () => {
        const isHidden = passwordType === 'password';
        setPasswordType(isHidden ? 'text' : 'password');
    }

    const eyeIcon = <i className="fas fa-eye"></i>;
    const crossedEyeIcon = <i className="far fa-eye-slash"></i>;

    const isLogin = type === 'Login';

    const iconClassList = 'auth-bg-icon ' + (isLogin ? '' : 'auth-page-register');
    return (
        <section className="auth-section">
            <i className={`fab fa-js-square auth-top-left-icon ${iconClassList}`} />
            <span className={`csharp-icon auth-top-right-icon ${iconClassList}`}>C#</span>

            <div className="auth-title-holder">
                <h1 className="auth-title">{type}</h1>
                <div className="line-under-title"></div>
            </div>
            <form method="POST" className="auth-form" onSubmit={onSubmit}>
                <div>
                    <label className="auth-form-label" htmlFor="email">Email</label>
                    <input className="auth-form-input" type="email" id="email" name="email" placeholder="john@doe.com" />
                </div>
                <div>
                    <article className="auth-form-password-label-wrap">
                        <label className="auth-form-label" htmlFor="password">Password</label>
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
                            <label className="auth-form-label" htmlFor="repassword">Repeat password</label>
                            <article className="auth-form-see-password" onClick={passwordTypeHandler}>
                                {passwordType === 'password'
                                    ? crossedEyeIcon
                                    : eyeIcon}
                            </article>
                        </article>
                        <input className="auth-form-input" type={passwordType} id="repassword" name="repassword" placeholder={'same as the one above'} />
                    </div>
                }
                {isLogin ||
                    <div>
                        <label className="auth-form-label" htmlFor="imageUrl">Avatar icon url</label>
                        <input className="auth-form-input" type='url' id="imageUrl" name="imageUrl" placeholder={'https://image.com'} />
                    </div>
                }
                <div>
                    <input className="auth-form-submit" type="submit" value={type} />
                    <Link className="link-to-other-auth" to={isLogin ? '/register' : '/login'}>
                        {isLogin ? "Don't have an account yet?" : "Already have an account?"}
                    </Link>
                </div>
            </form>

            <i className={`fab fa-python auth-bottom-left-icon ${iconClassList}`} />
            <i className={`fab fa-java auth-bottom-right-icon ${iconClassList}`} />
        </section>
    )
}