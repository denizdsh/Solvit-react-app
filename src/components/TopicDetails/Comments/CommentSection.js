import { useCallback, useEffect, useState } from 'react';

import { useNotification } from '../../../hooks/useNotification';
import { getComments, postComment } from '../../../services/topic';

import './CommentSection.css';
import Comment from './Comment';
import Spinner from '../../Common/Spinner/Spinner';

export default function CommentSection({ id, isAuthenticated }) {
    const [comments, setComments] = useState([]);
    const { showNotification } = useNotification();

    const getCommentsData = useCallback(async () => {
        try {
            const commentsData = await getComments(id);
            setComments(commentsData);
        } catch (err) {
            showNotification(err.message, 'error');
        }
    }, [id, showNotification])

    useEffect(() => {
        getCommentsData();
    }, [getCommentsData])

    const notificationHandler = () => {
        if (!isAuthenticated) {
            showNotification('_auth-warning');
        }
    }

    const commentHandler = async (e) => {
        e.preventDefault();

        notificationHandler()

        if (isAuthenticated) {
            const form = new FormData(e.currentTarget);
            const { content } = Object.fromEntries(form);

            try {
                if (!content.trim()) {
                    throw new Error('Cannot post an empty comment.');
                }

                e.currentTarget.reset();
                await postComment(id, content);
                showNotification('Successfully commented', 'success');
                getCommentsData()
            } catch (err) {
                showNotification(err.message, 'error');
            }
        }
    }

    return (
        <section className="comments">
            <article className="comment-form-article">
                <p className="comments-title">{comments.length} comments</p>
                <form method="POST" className="comment-form" onSubmit={commentHandler}>
                    <textarea disabled={!isAuthenticated} name="content" id="content" className={`comment-form-text${isAuthenticated ? '' : ' guest'}`} placeholder={isAuthenticated ? 'Share your thoughts...' : 'Log in or sign up to leave a comment'} onClick={notificationHandler} onInput={notificationHandler}></textarea>
                    <div className="comment-form-btn-wrapper">
                        <input type="submit" value="Comment" className="comment-form-btn" />
                    </div>
                </form>
            </article>

            {comments
                ? comments.map(comment => <Comment comment={comment} key={comment._id} />)
                : <Spinner modalType='comments-spinner spinner' />}
        </section >
    )
}