import './Comment.css';
import { Link } from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import blue from '@mui/material/colors/blue';

function getDate(dateData) {
    let [date, time] = dateData.split('T');
    time = time.split('.')[0];

    return `${date} ${time}`;
}
export default function Comment({ comment }) {
    const date = getDate(comment.updatedAt);
    return (
        <article className="comment">
            <article className="comment-info">
                <span className="comment-info-avatar">
                    <Link to={`/u/${comment.author}`}>
                        <Avatar
                            sx={{ bgcolor: blue[500], width: '2rem', height: '2rem', boxShadow: '0px 0px 7px -3px #86d6f9' }}
                            src={comment.authorImageUrl}
                            alt={comment.author.toLocaleUpperCase()}>
                            {comment.author[0].toLocaleUpperCase()}
                        </Avatar>
                    </Link>
                </span>
                <span className="comment-info-owner">
                    Posted by <Link className="comment-info-owner-username" to={`/u/${comment.author}`}>u/{comment.author}</Link>
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