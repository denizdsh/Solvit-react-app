import './CommentSection.css';
import Comment from './Comment';

export default function CommentSection({ comments }) {
    comments = [
        {
            owner: { username: 'Jeff', id: 'id' },
            date: '12:21 11.11 2002',
            content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. `,
            imageUrl: 'noimg.png'
        },
        {
            owner: { username: 'Tim', id: 'id' },
            date: '12:21 11.11 2002',
            content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. `,
            imageUrl: ''
        },
        {
            owner: { username: 'Bob', id: 'id' },
            date: '12:21 11.11 2002',
            content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. `,
            imageUrl: ''
        },
        {
            owner: { username: 'Peter', id: 'id' },
            date: '12:21 11.11 2002',
            content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. `,
            imageUrl: ''
        }
    ]
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

            {comments.map(comment => <Comment comment={comment} />)}
        </section>
    )
}