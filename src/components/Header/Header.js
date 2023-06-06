import './Header.css'
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';
import UserMenu from './UserMenu';

export default function Header() {
    const [isCategoryMenuActive, setIsCategoryMenuActive] = useState(false);
    const { user } = useAuth();
    const { pathname } = useLocation();

    const activeLink = useCallback((currentPath) => {
        if (pathname.includes(currentPath)) return ' active';

        return '';
    }, [pathname])

    //Categories dropdown menu functionality
    useEffect(() => {
        if (!isCategoryMenuActive) return;

        const clickOutsideHandler = (e) => {
            if (!e.target.classList.contains('dropdown-content')) setIsCategoryMenuActive(false);
        }

        document.addEventListener('click', clickOutsideHandler)

        return () => document.removeEventListener('click', clickOutsideHandler)
    }, [isCategoryMenuActive])

    const toggleCategoryMenu = () => {
        setIsCategoryMenuActive(value => !value);
    }

    const userNav = (
        <>
            <li className="nav-list-item main-nav-link">
                <Link to="/saved" className={activeLink('saved')}>Saved Topics</Link>
            </li>
            <UserMenu />
        </>
    )
    const guestNav = (
        <>
            <li className="nav-list-item main-nav-link" >
                <Link to="/login" className={"auth-btn login-btn" + activeLink('login')}>Log In</Link>
            </li>
            <li className="nav-list-item main-nav-link" >
                <Link to="/register" className={"auth-btn register-btn" + activeLink('register')}>Sign Up</Link>
            </li>
        </>
    )
    return (
        <nav className="nav">
            <article className="nav-logo">
                <Link to="/">
                    <img src="/logo.png" alt="solvit" className="nav-logo-image" />
                </Link>
            </article>

            <ul className="nav-list">
                <li className="nav-list-item main-nav-link" >
                    <Link to="/all" className={'link-to-all' + activeLink('all')}>All</Link>
                </li>
                <li className="nav-list-item dropdown" >
                    <button className={`dropdown-btn${isCategoryMenuActive ? ' active-dropdown-menu' : ''}${activeLink('c')}`} onClick={toggleCategoryMenu}>
                        Categories <i className="fa fa-caret-down"></i>
                    </button>
                    <article className="dropdown-content">
                        <Link to="/c/javascript" className={"dropdown-content-link" + activeLink('javascript')} >JavaScript</Link>
                        <Link to="/c/java" className={"dropdown-content-link" + activeLink('java')} >Java</Link>
                        <Link to="/c/csharp" className={"dropdown-content-link" + activeLink('csharp')} >C#</Link>
                        <Link to="/c/python" className={"dropdown-content-link" + activeLink('python')} >Python</Link>
                        <Link to="/c/c++" className={"dropdown-content-link" + activeLink('c++')} >C++</Link>
                        <Link to="/c/php" className={"dropdown-content-link" + activeLink('php')} >PHP</Link>
                        <Link to="/c/devops" className={"dropdown-content-link" + activeLink('devops')} >DevOps</Link>
                        <Link to="/c/qa" className={"dropdown-content-link" + activeLink('qa')} >QA</Link>

                        <Link to="/c/front-end" className="dropdown-content-link inner-dropdown-btn">
                            Front-end <i className="fa fa-caret-down"></i>
                        </Link>
                        <article className="inner-dropdown-content">
                            <Link to="/c/react" className={"dropdown-content-link" + activeLink('react')} >React</Link>
                            <Link to="/c/jquery" className={"dropdown-content-link" + activeLink('jquery')} >jQuery</Link>
                            <Link to="/c/angular" className={"dropdown-content-link" + activeLink('angular')} >Angular</Link>
                            <Link to="/c/vue.js" className={"dropdown-content-link" + activeLink('vue.js')} >Vue.js</Link>
                        </article>

                        <Link to="/c/back-end" className="dropdown-content-link inner-dropdown-btn">
                            Back-end <i className="fa fa-caret-down"></i>
                        </Link>
                        <article className="inner-dropdown-content">
                            <Link to="/c/node.js" className={"dropdown-content-link" + activeLink('node.js')}>Node.js</Link>
                            <Link to="/c/spring" className={"dropdown-content-link" + activeLink('spring')}>Spring</Link>
                            <Link to="/c/asp.net" className={"dropdown-content-link" + activeLink('asp.net')}>ASP.NET</Link>
                            <Link to="/c/django" className={"dropdown-content-link" + activeLink('django')}>Django</Link>
                        </article>

                        <Link to="/c/other" className={"dropdown-content-link" + activeLink('other')} >Other</Link>
                    </article>
                </li>

                {user.accessToken
                    ? userNav
                    : guestNav}
            </ul>
        </nav >
    );
}