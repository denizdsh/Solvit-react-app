import './UserMenu.css';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import blue from '@mui/material/colors/blue';

export default function UserMenu() {
    const { user } = useAuth();

    const ref = useRef();

    const [isOpen, setIsOpen] = useState(false);

    const userMenuHandler = () => {
        setIsOpen(state => !state);
    }

    useEffect(() => {
        const clickOutsideHandler = (e) => {
            if (isOpen && ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", clickOutsideHandler)

        return () => {
            document.removeEventListener("mousedown", clickOutsideHandler)
        }
    }, [isOpen])

    return (
        <div ref={ref}>
            <article className="user-avatar" onClick={userMenuHandler}>
                <Avatar
                    sx={{ bgcolor: blue[500], width: '3rem', height: '3rem', boxShadow: '0px 0px 7px -3px #86d6f9' }}
                    src={user.imageUrl}
                    alt={user.username.toLocaleUpperCase()}>
                    {user.username[0].toLocaleUpperCase()}
                </Avatar>
            </article>

            {
                isOpen && (
                    <article className="user-menu">
                        <article className="user-menu-info">
                            <Avatar
                                sx={{ bgcolor: blue[500], width: '9rem', height: '9rem', boxShadow: '0px 0px 7px -3px #86d6f9' }}
                                src={user.imageUrl}
                                alt={user.username.toLocaleUpperCase()}>
                                {user.username[0].toLocaleUpperCase()}
                            </Avatar>
                            <p className="user-menu-info-username">{user.username}</p>
                            <p className="user-menu-info-email">{`(${user.email})`}</p>
                        </article>
                        <article className="user-menu-links">
                            <Link to={`/u/${user.username}`} className="dropdown-content-link">My Topics</Link>
                            <Link to='TODO' className="dropdown-content-link">Edit Avatar</Link>
                            <Link to="/logout" className="dropdown-content-link">Logout</Link>
                        </article>
                    </article>
                )
            }
        </div>
    )
}