import { Link, useNavigate } from 'react-router-dom';

import { useTopicHandlers } from '../../hooks/useTopicHandlers'

import './TopicCard.css';
import Button from '@mui/material/Button';

function getDate(dateData) {
    let [date, time] = dateData.split('T');
    time = time.split('.')[0];

    return `${date} ${time}`;
}

export default function TopicCard({ topic, isAuthenticated, user, fc, st }) {
    const th = useTopicHandlers(topic, fc, st, isAuthenticated, user);
    const navigate = useNavigate();

    const date = getDate(topic.createdAt);

    return (
        <section className="topic active-hover" >
            <article className="topic-info">
                <article className="topic-info-creation-wrap">
                    <article className="topic-info-category">
                        <span className="category">
                            <Link to={`/c/${topic.category}`}>
                                c/{topic.category}
                            </Link>
                        </span>
                    </article>
                    <article className="topic-info-creation">
                        <span className="topic-info-creation-posted-by">
                            Posted by <Link className="topic-info-creation-posted-by-username" to={`/u/${topic.author}`}>u/{topic.author}</Link>
                        </span>
                        <span className="topic-info-creation-date">{date}</span>
                    </article>
                </article>
                <article className="topic-info-follow-category">
                    {th.hasFollowed
                        ? <Button color="secondary" size="small" className="topic-info-follow-category-btn unfollow-category-btn" onClick={th.unfollowCategoryHandler}>Following</Button>
                        : <Button variant="contained" color="success" size="small" className="topic-info-follow-category-btn" onClick={th.followCategoryHandler}>
                            Follow
                        </Button>
                    }</article>
            </article>
            <article className="topic-content hover" onClick={() => navigate(`/t/${topic._id}`)}>
                <article className="topic-content-title">
                    <h2 className="topic-title">
                        {topic.title}
                    </h2>
                </article>
                {topic.imageUrl
                    ?
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
                    <li className="topic-functionality-list-item topic-functionality-list-item-likes" onClick={th.hasLiked ? th.dislikeTopicHandler : th.likeTopicHandler}>
                        {th.hasLiked
                            ? <i className="fas fa-heart"></i>
                            : <i className="far fa-heart"></i>
                        }
                        <span className="likes-count">{th.likes} Likes</span>
                    </li>
                    <li className="topic-functionality-list-item topic-functionality-list-item-comments" onClick={() => navigate(`/t/${topic._id}`)}>
                        <i className="fas fa-comments"></i>
                        <span className="comments-count">{topic.comments} Comments</span>
                    </li>
                    <li className="topic-functionality-list-item topic-functionality-list-item-follow" onClick={th.hasSaved ? th.unsaveTopicHandler : th.saveTopicHandler}>
                        <span className="save-topic-text">
                            {th.hasSaved ? 'Unsave' : 'Save'}
                        </span>

                        {th.hasSaved
                            ? <i className="fas fa-bookmark"></i>
                            : <i className="far fa-bookmark"></i>
                        }
                    </li>
                </ul>
            </article>
        </section>
    )
}