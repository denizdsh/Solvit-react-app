import './CommentSection.css';
import Comment from './Comment';

export default function CommentSection({ comments }) {
    return (
        <section className="comments">
            <article className="comment-form-article">
                <p className="comments-title">{comments.length} comments</p>
                <form method="post" className="comment-form">
                    <textarea name="comment" form="comment-form" placeholder="Share your thoughts..." className="comment-form-text" />
                    <div className="comment-form-btn-wrapper">
                        <input type="submit" value="Comment" className="comment-form-btn" />
                    </div>
                </form>
            </article>

            {comments.map(comment => <Comment comment={comment} key={comment._id} />)}
        </section>
    )
}