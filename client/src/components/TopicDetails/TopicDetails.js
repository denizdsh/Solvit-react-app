import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, Routes, Route } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { useTopic } from '../../hooks/useTopic';
import { useTopicFunctionality } from '../../hooks/useTopicFunctionality';
import { useTopicHandlers } from '../../hooks/useTopicHandlers';
import { getTopicById } from '../../services/topic';
import { getFollowingCategories, followCategory, unfollowCategory, getSavedTopicsIds, saveTopic, unsaveTopic } from '../../services/user';

import './TopicDetails.css';
import EditTopic from '../TopicActions/EditTopic';
import DeleteTopic from '../TopicActions/DeleteTopic';
import Button from '@mui/material/Button';
import CommentSection from '../TopicDetails/Comments/CommentSection';
import Spinner from '../Spinner/Spinner';

function getDate(dateData) {
    let [date, time] = dateData.split('T');
    time = time.split('.')[0];

    return `${date} ${time}`;
}

export default function TopicDetails() {
    const [topic, setTopic] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    const context = useTopic();
    const { isAuthenticated, user } = useAuth();
    const isOwner = topic._ownerId === user._id;

    useEffect(() => {
        (async () => {
            try {
                const topicData = await getTopicById(id);
                setTopic(topicData);

                if (isOwner) {
                    context.provideTopic(topicData);
                }
            } catch (err) {
                // navigate(-1, { replace: true });
                console.error(err)
            }
        })();
    }, [isOwner, id, navigate])


    const fc = useTopicFunctionality(getFollowingCategories, followCategory, unfollowCategory, isAuthenticated);
    const st = useTopicFunctionality(getSavedTopicsIds, saveTopic, unsaveTopic, isAuthenticated);
    const th = useTopicHandlers(topic, fc, st, isAuthenticated, user)

    const date = topic?.updatedAt ? getDate(topic.updatedAt) : '';

    return (
        topic._id
            ?

            <section className="topic details">
                {
                    isOwner &&
                    <Routes>
                        <Route path="edit" element={<EditTopic />} />
                        <Route path="delete" element={<DeleteTopic />} />
                    </Routes>
                }
                <article className="topic-info  details">
                    <article className="topic-info-creation-wrap details">
                        <article className="topic-info-category details">
                            <span className="category details">
                                <Link to={`/c/${topic.category}`}>
                                    category/{topic.category}
                                </Link>
                            </span>
                        </article>
                        <article className="topic-info-creation details">
                            <span className="topic-info-creation-posted-by details">
                                Posted by <Link className="topic-info-creation-posted-by-username" to={`/u/${topic.author}`}>u/{topic.author}</Link>
                            </span>
                            <span className="topic-info-creation-date details">{date}</span>
                        </article>
                    </article>
                    <article className="topic-info-follow-category details">
                        {
                            th.hasFollowed
                                ? <Button color="secondary" size="small" className="topic-info-follow-category-btn unfollow-category-btn details" onClick={th.unfollowCategoryHandler}>Following</Button>
                                : <Button variant="contained" color="success" size="small" className="topic-info-follow-category-btn details" onClick={th.followCategoryHandler}>Follow</Button>
                        }
                    </article>
                </article>
                <article className="topic-content details">
                    <article className="topic-content-title details">
                        <h2 className="topic-title details">
                            {topic.title}
                        </h2>
                    </article>

                    <article className="topic-content-description details">
                        <p className="topic-content-description-text details">{topic.description}</p>
                    </article>

                    <article className="topic-content-img details">
                        <img src={topic.imageUrl} alt="" className="topic-content-img-image details" />
                    </article>

                </article>
                <article className="topic-functionality details">
                    <ul className="topic-functionality-list details">
                        <li className="topic-functionality-list-item topic-functionality-list-item-likes details" onClick={th.hasLiked ? th.dislikeTopicHandler : th.likeTopicHandler}>
                            {
                                th.hasLiked
                                    ? <i className="fas fa-heart details"></i>
                                    : <i className="far fa-heart details"></i>
                            }
                            <span className="likes-count details">{topic.likes.length} Likes</span>
                        </li>
                        <li className="topic-functionality-list-item topic-functionality-list-item-follow details" onClick={th.hasSaved ? th.unsaveTopicHandler : th.saveTopicHandler}>
                            {
                                !isOwner &&
                                <span className="save-topic-text">
                                    {th.hasSaved ? 'Unsave' : 'Save'}
                                </span>
                            }
                            {
                                th.hasSaved
                                    ? <i className="fas fa-bookmark details"></i>
                                    : <i className="far fa-bookmark details"></i>
                            }
                            {
                                isOwner &&
                                <span className="save-topic-text">
                                    {th.hasSaved ? 'Unsave' : 'Save'}
                                </span>
                            }
                        </li>
                        {
                            isOwner &&

                            <li className="topic-functionality-list-item topic-functionality-list-item-edit details" onClick={() => console.log('edit')}>
                                <Link to='edit' className='owner-functionality-button button-edit'>
                                    <span className="edit-btn">Edit</span>
                                    <i style={{ 'fontSize': '1.1rem' }} className="fas fa-pencil-alt"></i>
                                </Link>
                            </li>
                        }
                        {
                            isOwner &&
                            <li className="topic-functionality-list-item topic-functionality-list-item-delete  details" onClick={() => console.log('delete')}>
                                <Link to='delete' className='owner-functionality-button button-delete'>
                                    <span className="delete-btn">
                                        Delete
                                    </span>
                                    <i style={{ 'fontSize': '1.1rem' }} className="fas fa-trash"></i>
                                </Link>
                            </li>
                        }
                    </ul>
                </article>
                <CommentSection id={topic._id} isAuthenticated={isAuthenticated} />
            </section>
            :
            <Spinner />
    )
}