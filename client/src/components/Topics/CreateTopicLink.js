import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';

import './CreateTopicLink.css';
import Avatar from '@mui/material/Avatar';
import blue from '@mui/material/colors/blue';

export default function CreateTopicLink() {
    const { user, isAuthenticated } = useAuth();
    const { notification, showNotification, closeNotification } = useNotification();
    const navigate = useNavigate();

    const redirectToCreateHandler = () => {
        navigate('create');
    }

    const redirectToLogin = () => {
        showNotification('_auth-warning', 'warning')
    }
    return (
        isAuthenticated
            ?
            (
                <section className="create-topic-link">
                    <Avatar
                        sx={{ bgcolor: blue[500], width: '3rem', height: '3rem', boxShadow: '0px 0px 7px -3px #86d6f9' }}
                        src={user.imageUrl}
                        alt={user.username.toLocaleUpperCase()}>
                        {user.username[0].toLocaleUpperCase()}
                    </Avatar>
                    <input type="text" className="create-topic-link-input" placeholder="What's on your mind?" onClick={redirectToCreateHandler} onInput={redirectToCreateHandler} />
                </section>
            )
            :
            (
                <section className="create-topic-link">
                    <Avatar
                        sx={{ bgcolor: blue[500], width: '3rem', height: '3rem', boxShadow: '0px 0px 7px -3px #86d6f9' }}
                        src=''
                        alt=''>
                    </Avatar>
                    <input type="text" className="create-topic-link-input" placeholder="Log in to create a post" onClick={redirectToLogin} onInput={redirectToLogin} />
                </section>

            )
    )
}