import {getDate} from '../../../services/util';

import './Comment.css';
import { Link } from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import blue from '@mui/material/colors/blue';

export default function Comment({ comment }) {
    const date = getDate(comment.createdAt);
    return (
        <article className="comment">
            <article className="comment-info">
                <span className="comment-info-avatar">
                    <Link to={`/u/${comment.author}`}>
                        <Avatar
                            sx={{ bgcolor: blue[500], width: '1.85rem', height: '1.85rem', boxShadow: '0px 0px 7px -3px #86d6f9', marginRight: '4px' }}
                            src={comment.authorImageUrl}
                            alt={comment.author.toLocaleUpperCase()}>
                            {comment.author[0].toLocaleUpperCase()}
                        </Avatar>
                    </Link>
                </span>
                <span className="comment-info-owner">
                    <Link className="comment-info-owner-username" to={`/u/${comment.author}`}>u/{comment.author}</Link>
                </span>
                <span className="comment-info-date">{date}</span>
            </article>
            <article className="comment-content">
                <p className="comment-content-text">
                    {comment.content}
                </p>
            </article>
        </article>
    )
}