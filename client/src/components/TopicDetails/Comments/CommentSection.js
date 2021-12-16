import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getComments, postComment } from '../../../services/topic';


import './CommentSection.css';
import Comment from './Comment';

export default function CommentSection({ id, isAuthenticated }) {
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const commentsData = await getComments(id);
                setComments(commentsData);
            } catch (err) {
                console.error(err);
            }
        })()
    }, [])

    const redirectHandler = () => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }
    const commentHandler = async (e) => {
        e.preventDefault();
        
        redirectHandler()

        if (isAuthenticated) {
            const form = new FormData(e.currentTarget);
            const { content } = Object.fromEntries(form);

            try {
                const comment = await postComment(id, content);

                setComments([...comments, comment]);
            } catch (err) {
                console.error(err);
            }
        } 
    }

    return (
        <section className="comments">
            <article className="comment-form-article">
                <p className="comments-title">{comments.length} comments</p>
                <form method="POST" className="comment-form" onSubmit={commentHandler}>
                    <textarea name="content" id="content" className="comment-form-text" placeholder={isAuthenticated ? 'Share your thoughts...' : 'Log in to comment'} onClick={redirectHandler} onInput={redirectHandler}></textarea>
                    <div className="comment-form-btn-wrapper">
                        <input type="submit" value="Comment" className="comment-form-btn" />
                    </div>
                </form>
            </article>

            {comments.map(comment => <Comment comment={comment} key={comment._id} />)}
        </section>
    )
}