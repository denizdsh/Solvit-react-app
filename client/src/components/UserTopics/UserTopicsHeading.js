import { useEffect, useState } from 'react';
import { getUserImageByUsername } from '../../services/misc';

import './UserTopicsHeading.css';
import Avatar from '@mui/material/Avatar';
import blue from '@mui/material/colors/blue';

export default function UserTopicsHeading({ user }) {
    const [image, setImage] = useState('');
    useEffect(() => {
        (async () => {
            const imageUrl = await getUserImageByUsername(user);
            setImage(imageUrl);
        })()
    }, [user])

    return (
        <section className="user-topics-heading">
            <Avatar
                sx={{ bgcolor: blue[500], width: '4rem', height: '4rem', boxShadow: '0px 0px 7px -3px #86d6f9' }}
                src={image}
                alt={user}>
                {user[0]}
            </Avatar>
            <p className="user-topics-heading-title">{user}'s posts</p>
        </section>
    )
}