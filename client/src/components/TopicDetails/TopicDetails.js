import { useEffect } from 'react';

import './TopicDetails.css';
import CommentSection from '../TopicDetails/Comments/CommentSection';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

export default function TopicDetails({ topic }) {
    useEffect(() => {
        window.scrollTo(0, 0);   
    })

    topic = {
        category: 'javascript',
        owner: { id: 'id', username: 'Stanley' },
        date: '4:30 18/10/2021',
        title: 'slice VS splice',
        //https://wallpaperaccess.com/full/31193.jpg
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Java_source2.svg/350px-Java_source2.svg.png',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

            Why do we use it?
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.The point of using Lorem Ipsum is that it has a more- or - less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.Various versions have evolved over the years, sometimes by accident, sometimes on purpose(injected humour and the like).
            
            
            Where does it come from ?
        Contrary to popular belief, Lorem Ipsum is not simply random text.It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.Richard McClintock, a Latin professor at Hampden - Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"(The Extremes of Good and Evil) by Cicero, written in 45 BC.This book is a treatise on the theory of ethics, very popular during the Renaissance.The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H.Rackham.",`,
        likes: [{}, {}, {}, {}, {}],
        comments: [{}, {}, {}]
    }
    return (
        <section className="topic details">
            <article className="topic-info  details">
                <article className="topic-info-creation-wrap details">
                    <article className="topic-info-category details">
                        <span className="category details">
                            <Link to="# details">
                                category/{topic.category}
                            </Link>
                        </span>
                    </article>
                    <article className="topic-info-creation details">
                        <span className="topic-info-creation-posted-by details">
                            Posted by <Link className="topic-info-creation-posted-by-username" to="# details">u/{topic.owner.username}</Link>
                        </span>
                        <span className="topic-info-creation-date details">{topic.date}</span>
                    </article>
                </article>
                <article className="topic-info-follow-category details">
                    <Button variant="contained" color="success" size="small" className="topic-info-follow-category-btn details">
                        Follow
                    </Button>
                    <Button color="secondary" size="small" className="topic-info-follow-category-btn unfollow-category-btn details">Following</Button>
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
                    <li className="topic-functionality-list-item topic-functionality-list-item-likes details">
                        <i className="far fa-heart details"></i>
                        <i className="fas fa-heart details"></i>
                        <span className="likes-count details">{topic.likes.length} Likes</span>
                    </li>
                    <li className="topic-functionality-list-item topic-functionality-list-item-follow details">
                        <i className="far fa-bookmark details"></i>
                        <i className="fas fa-bookmark details"></i>
                        Follow
                    </li>
                </ul>
            </article>
            <CommentSection comments={topic.comments} />
        </section>
    )
}