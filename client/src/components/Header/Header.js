import './Header.css'
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import blue from '@mui/material/colors/blue';

import { AuthContext } from '../../contexts/AuthContext';


export default function Header() {
    const { user } = useContext(AuthContext);
    const [active, setActive] = useState({ classList: { remove: function () { }, add: function () { } } });

    const activeHandler = (e) => {
        active.classList.remove('active');
        e.currentTarget.classList.add('active');
        setActive(e.currentTarget);
    }

    const userNav = [
        {
            to: '/saved',
            children: 'Saved topics'
        },
        {
            to: `/u/${user._id}`,
            children: (
                <Avatar
                    sx={{ bgcolor: blue[500], width: 46, height: 46, boxShadow: '0px 0px 7px -3px #86d6f9' }}
                    src={user.imageUrl}
                    alt={user.username}>
                    {user.username[0]}
                </Avatar>
            )
        }
    ]

    const guestNav = [
        {
            to: '/login',
            children: 'Log In',
            className: 'login-btn'
        },
        {
            to: '/register',
            children: 'Sign Up',
            className: 'register-btn'
        },
    ]
    const navListItemMap = ({ to, children, ...props }) => {
        return (
            <li className="nav-list-item" >
                <Link to={to} onClick={activeHandler} {...props} >{children}</Link>
            </li>
        )
    }
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
                            <Link to="/c/front-end/react" className="dropdown-content-link" >React</Link>
                            <Link to="/c/front-end/jquery" className="dropdown-content-link" >jQuery</Link>
                            <Link to="/c/front-end/angular" className="dropdown-content-link" >Angular</Link>
                            <Link to="/c/front-end/vue.js" className="dropdown-content-link" >Vue.js</Link>
                        </article>

                        <Link to="/c/back-end" className="dropdown-content-link inner-dropdown-btn">
                            Back-end <i className="fa fa-caret-down"></i>
                        </Link>
                        <article className="inner-dropdown-content">
                            <Link to="/c/back-end/node.js" className="dropdown-content-link">Node.js</Link>
                            <Link to="/c/back-end/spring" className="dropdown-content-link">Spring</Link>
                            <Link to="/c/back-end/asp.net" className="dropdown-content-link">ASP.NET</Link>
                            <Link to="/c/back-end/django" className="dropdown-content-link">Django</Link>
                        </article>

                        <Link to="/c/other" className="dropdown-content-link" >Other</Link>
                    </article>
                </li>

                {user.accessToken
                    ? userNav.map(navListItemMap)
                    : guestNav.map(navListItemMap)}
            </ul>
        </nav>
    );
}
