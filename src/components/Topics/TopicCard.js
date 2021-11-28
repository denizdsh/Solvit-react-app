import './TopicCard.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
export default function TopicCard({ topic }) {

    const activeHoverHandler = (e) => {
        e.target.classList.toggle('active-hover');
    }
    return (
        <section className="topic" onMouseEnter={activeHoverHandler} onMouseLeave={activeHoverHandler}>
            <article className="topic-info">
                <article className="topic-info-creation-wrap">
                    <article className="topic-info-category">
                        <span className="category">
                            <Link to="#">
                                category/{topic.category}
                            </Link>
                        </span>
                    </article>
                    <article className="topic-info-creation">
                        <span className="topic-info-creation-posted-by">
                            Posted by <Link to="#">u/{topic.owner.username}</Link>
                        </span>
                        <span className="topic-info-creation-date">{topic.date}</span>
                    </article>
                </article>
                <article className="topic-info-follow-category">
                    <Button variant="contained" color="success" size="small" className="topic-info-follow-category-btn">
                        follow
                    </Button>
                    <Button color="secondary" size="small" className="topic-info-follow-category-btn unfollow-category-btn">following</Button>
                </article>
            </article>
            <article className="topic-content">
                <article className="topic-content-title">
                    <h2 className="topic-title">
                        {topic.title}
                    </h2>
                </article>
                <article className="topic-content-img scrollbox">
                    <img src={topic.imageUrl} alt="" className="topic-content-img-image" />
                </article>
            </article>
            <article className="topic-functionality">
                <ul className="topic-functionality-list">
                    <li className="topic-functionality-list-item">
                        <i class="far fa-heart"></i>
                        <i class="fas fa-heart"></i>
                        <span className="likes-count">{topic.likes.length} Likes</span>
                    </li>
                    <li className="topic-functionality-list-item">
                        <i class="fas fa-comments"></i>
                        {topic.comments.length} Comments
                    </li>
                    <li className="topic-functionality-list-item">
                        <i class="far fa-bookmark"></i>
                        <i class="fas fa-bookmark"></i>
                        Follow
                    </li>
                </ul>
            </article>
        </section>
    )
}