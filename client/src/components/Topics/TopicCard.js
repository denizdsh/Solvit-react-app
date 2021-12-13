import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './TopicCard.css';
import { getCardTopicUserData } from '../../services/user';
import Button from '@mui/material/Button';

function getDate(dateData) {
    let [date, time] = dateData.split('T');
    time = time.split('.')[0];

    return `${date} ${time}`;
}

export default function TopicCard({ topic, isAuthenticated, fc }) {
    const [hasFollowed, setHasFollowed] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasSaved, setHasSaved] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            setHasFollowed(false);
            return;
        }
        let hf = fc.categories.includes(topic.category);

        setHasFollowed(hf);

    }, [fc])

    useEffect(() => {
        (async () => {
            if (!isAuthenticated) {
                return;
            }

            let userData = await getCardTopicUserData();

            let hl = topic.likes.includes(userData.username);
            let hs = userData.savedTopics.includes(topic._id);

            setHasLiked(hl);
            setHasSaved(hs);
        })()
    }, [])

    const followCategoryHandler = async () => {
        if (isAuthenticated) {
            await fc.addFollowingCategory(topic.category);
        } else {
            navigate('/login');
        }
    }
    const unfollowCategoryHandler = async () => {
        if (isAuthenticated) {
            await fc.removeFollowingCategory(topic.category);
        } else {
            navigate('/login');
        }
    }

    const likeHandler = () => {
        if (isAuthenticated) {
            //TODO
        } else {
            navigate('/login');
        }
    }

    const saveTopicHandler = () => {
        if (isAuthenticated) {
            //TODO
        } else {
            navigate('/login');
        }
    }
    const date = getDate(topic.updatedAt);

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
                    {!hasFollowed
                        ? <Button variant="contained" color="success" size="small" className="topic-info-follow-category-btn" onClick={followCategoryHandler}>
                            Follow
                        </Button>
                        : <Button color="secondary" size="small" className="topic-info-follow-category-btn unfollow-category-btn" onClick={unfollowCategoryHandler}>Following</Button>
                    }</article>
            </article>
            <article className="topic-content hover" onClick={() => navigate(`/${topic._id}`)}>
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
                        <i className="far fa-heart"></i>
                        <i className="fas fa-heart"></i>
                        <span className="likes-count">{topic.likes.length} Likes</span>
                    </li>
                    <li className="topic-functionality-list-item topic-functionality-list-item-comments">
                        <i className="fas fa-comments"></i>
                        {topic.comments.length} Comments
                    </li>
                    <li className="topic-functionality-list-item topic-functionality-list-item-follow">
                        <i className="far fa-bookmark"></i>
                        <i className="fas fa-bookmark"></i>
                        Save
                    </li>
                </ul>
            </article>
        </section>
    )
}