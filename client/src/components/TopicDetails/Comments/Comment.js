import './Comment.css';
import { Link } from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import blue from '@mui/material/colors/blue';

export default function Comment({ comment }) {
    return (
        <article className="comment">
            <article className="comment-info">
                <span className="comment-info-avatar">
                    <Avatar
                        sx={{ bgcolor: blue[500], width: 33, height: 33, boxShadow: '0px 0px 7px -3px #86d6f9' }}
                        src={comment.owner.imageUrl}
                        alt={comment.owner.username.toLocaleUpperCase()}>
                        {comment.owner.username[0].toLocaleUpperCase()}
                    </Avatar>
                </span>
                <span className="comment-info-owner">
                    Posted by <Link className="comment-info-owner-username" to={`/user/${comment.owner.id}`}>u/{comment.owner.username}</Link>
                </span>
                <span className="comment-info-date">{comment.date}</span>
            </article>
            <article className="comment-content">
                <p className="comment-content-text">
                    {comment.content}
                </p>
            </article>
        </article>
    )
}