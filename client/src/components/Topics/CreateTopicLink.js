import './CreateTopicLink.css';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';

export default function CreateTopicLink() {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const redirectToCreateHandler = (e) => {
        navigate('create');
    }
    return (
        isAuthenticated
            ?
            (
                <section className="create-topic-link">
                    <Avatar
                        sx={{ bgcolor: blue[500], width: '3rem', height: '3rem', boxShadow: '0px 0px 7px -3px #86d6f9' }}
                        src={user.imageUrl}
                        alt={user.username}>
                        {user.username[0]}
                    </Avatar>
                    <input type="text" className="create-topic-link-input" placeholder="What's on your mind?" onClick={redirectToCreateHandler} onInput={redirectToCreateHandler} />
                </section>
            )
            :
            (
                <Link to="/login">Please log in in order to post a topic.</Link >
            )
    )
}