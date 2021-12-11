import { useState } from 'react';

import './Auth.css'
import { Link } from 'react-router-dom';
import { isGuest } from '../../hoc/isAuth';

function Auth({ type, onSubmit }) {
    const [passwordType, setPasswordType] = useState('password');
    const [showImageInput, setShowImageInput] = useState(false);

    const passwordTypeHandler = () => {
        const isHidden = passwordType === 'password';
        setPasswordType(isHidden ? 'text' : 'password');
    }

    const eyeIcon = <i className="fas fa-eye"></i>;
    const crossedEyeIcon = <i className="far fa-eye-slash"></i>;

    let caret = showImageInput ? <i className="fa fa-caret-down"></i> : <i className="fa fa-caret-right"></i>

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
                {isLogin ||
                    <div>
                        <label className="auth-form-label" htmlFor="username">Username</label>
                        <input className="auth-form-input" type="username" id="username" name="username" placeholder="John Doe" />
                    </div>
                }
                <div>
                    <article className="auth-form-password-label-wrap">
                        <label className="auth-form-label" htmlFor="password">Password</label>
                        <article className="auth-form-see-password" onClick={passwordTypeHandler}>
                            {passwordType === 'password'
                                ? crossedEyeIcon
                                : eyeIcon}
                        </article>
                    </article>
                    <input className="auth-form-input" type={passwordType} id="password" name="password" placeholder={isLogin ? '' : 'At least 6 characters'} />
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
                        <input className="auth-form-input" type={passwordType} id="repassword" name="repassword" placeholder={'Same as password'} />
                    </div>
                }
                {isLogin ||
                    <div>
                        <label className="auth-form-label auth-form-imageUrl-label" htmlFor="imageUrl" onClick={() => setShowImageInput(oldState => !oldState)}>Avatar icon {caret}</label>
                        {showImageInput &&
                            <>
                                <input className="auth-form-input" type='url' id="imageUrl" name="imageUrl" placeholder='URL - not requried' />
                                <a className="link-to-imgur" href="https://imgur.com/upload" target="_blank" rel="noreferrer">You can upload your image here...</a>
                            </>
                        }
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

export default isGuest(Auth);