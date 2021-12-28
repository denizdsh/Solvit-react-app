import './Header.css'
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';


import UserMenu from './UserMenu';

export default function Header() {
    const { user } = useAuth();
    const [active, setActive] = useState({ classList: { remove: function () { }, add: function () { } } });

    const activeHandler = (e) => {
        active.classList.remove('active');
        e.currentTarget.classList.add('active');
        setActive(e.currentTarget);
    }

    const userNav = (
        <>
            <li className="nav-list-item" >
                <Link to="/saved" onClick={activeHandler}>Saved topics</Link>
            </li>

            <UserMenu />
        </>
    )
    const guestNav = (
        <>
            <li className="nav-list-item" >
                <Link to="/login" className="auth-btn login-btn" onClick={activeHandler}>Log In</Link>
            </li>
            <li className="nav-list-item" >
                <Link to="/register" className="auth-btn register-btn" onClick={activeHandler}>Sign Up</Link>
            </li>
        </>
    )

    return (
        <nav className="nav">
            <article className="nav-logo">
                <Link to="/" onClick={activeHandler}>
                    <img src="/logo.png" alt="solvit" className="nav-logo-image" />
                </Link>
            </article>

            <ul className="nav-list">
                <li className="nav-list-item" >
                    <Link to="/all" onClick={activeHandler}>All</Link>
                </li>
                <li className="nav-list-item dropdown" >
                    <button className="dropdown-btn ">
                        Categories <i className="fa fa-caret-down"></i>
                    </button>
                    <article className="dropdown-content">
                        <Link to="/c/javascript" className="dropdown-content-link" >JavaScript</Link>
                        <Link to="/c/java" className="dropdown-content-link" >Java</Link>
                        <Link to="/c/csharp" className="dropdown-content-link" >C#</Link>
                        <Link to="/c/python" className="dropdown-content-link" >Python</Link>
                        <Link to="/c/c++" className="dropdown-content-link" >C++</Link>
                        <Link to="/c/php" className="dropdown-content-link" >PHP</Link>
                        <Link to="/c/devops" className="dropdown-content-link" >DevOps</Link>
                        <Link to="/c/qa" className="dropdown-content-link" >QA</Link>

                        <Link to="/c/front-end" className="dropdown-content-link inner-dropdown-btn">
                            Front-end <i className="fa fa-caret-down"></i>
                        </Link>
                        <article className="inner-dropdown-content">
                            <Link to="/c/react" className="dropdown-content-link" >React</Link>
                            <Link to="/c/jquery" className="dropdown-content-link" >jQuery</Link>
                            <Link to="/c/angular" className="dropdown-content-link" >Angular</Link>
                            <Link to="/c/vue.js" className="dropdown-content-link" >Vue.js</Link>
                        </article>

                        <Link to="/c/back-end" className="dropdown-content-link inner-dropdown-btn">
                            Back-end <i className="fa fa-caret-down"></i>
                        </Link>
                        <article className="inner-dropdown-content">
                            <Link to="/c/node.js" className="dropdown-content-link">Node.js</Link>
                            <Link to="/c/spring" className="dropdown-content-link">Spring</Link>
                            <Link to="/c/asp.net" className="dropdown-content-link">ASP.NET</Link>
                            <Link to="/c/django" className="dropdown-content-link">Django</Link>
                        </article>

                        <Link to="/c/other" className="dropdown-content-link" >Other</Link>
                    </article>
                </li>

                {user.accessToken
                    ? userNav
                    : guestNav}
            </ul>
        </nav>
    );
}