import './Header.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { blue } from '@mui/material/colors';

export default function Header() {
    const [active, setActive] = useState({ classList: { remove: function () { }, add: function () { } } });

    const activeHandler = (e) => {
        active.classList.remove('active');
        e.currentTarget.classList.add('active');
        setActive(e.currentTarget);
    }

    const commonNav = [
        {
            to: '/all',
            children: 'All'
        },
        {
            to: '#',
            children: 'Categories (dropdown)'
        }
    ]

    const userNav = [
        {
            to: '#',
            children: 'Saved topics'
        },
        {
            to: '/my-topics/#',
            children: (
                <Avatar
                    sx={{ bgcolor: blue[500], width: 46, height: 46, boxShadow: '0px 0px 7px -3px #86d6f9' }}
                    alt="Username"
                    src="user-picture"
                />
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
                {commonNav.map(navListItemMap)}

                {userNav.map(navListItemMap)}

                {guestNav.map(navListItemMap)}
            </ul>
        </nav>
    );
}
