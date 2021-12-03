import './TopicCard.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
export default function TopicCard({ topic }) {
    const navigate = useNavigate();

    return (
        <section className="topic active-hover" >
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
                            Posted by <Link className="topic-info-creation-posted-by-username" to="#">u/{topic.owner.username}</Link>
                        </span>
                        <span className="topic-info-creation-date">{topic.date}</span>
                    </article>
                </article>
                <article className="topic-info-follow-category">
                    <Button variant="contained" color="success" size="small" className="topic-info-follow-category-btn">
                        Follow
                    </Button>
                    <Button color="secondary" size="small" className="topic-info-follow-category-btn unfollow-category-btn">Following</Button>
                </article>
            </article>
            <article className="topic-content hover" onClick={() => navigate('/id')}>
                <article className="topic-content-title">
                    <h2 className="topic-title">
                        {topic.title}
                    </h2>
                </article>
                {topic?.imageUrl ?
                    <article className="topic-content-img scrollbox">
                        <img src={topic.imageUrl} alt="" className="topic-content-img-image" />
                    </article>
                    :
                    <article className="topic-content-description scrollbox">
                        <p className="topic-content-description-text">{topic.description}</p>
                    </article>
                }

            </article>
            <article className="topic-functionality">
                <ul className="topic-functionality-list">
                    <li className="topic-functionality-list-item topic-functionality-list-item-likes">
                        <i class="far fa-heart"></i>
                        <i class="fas fa-heart"></i>
                        <span className="likes-count">{topic.likes.length} Likes</span>
                    </li>
                    <li className="topic-functionality-list-item topic-functionality-list-item-comments">
                        <i class="fas fa-comments"></i>
                        {topic.comments.length} Comments
                    </li>
                    <li className="topic-functionality-list-item topic-functionality-list-item-follow">
                        <i class="far fa-bookmark"></i>
                        <i class="fas fa-bookmark"></i>
                        Follow
                    </li>
                </ul>
            </article>
        </section>
    )
}