import './Topics.css'
import { useState } from 'react'
import Button from '@mui/material/Button';
export default function Topics({ topics }) {

    const activeHoverHandler = (e) => {
        e.target.classList.toggle('active-hover');
    }
    return (
        <section className="topics">
            <section className="topic" onMouseEnter={activeHoverHandler} onMouseLeave={activeHoverHandler}>
                <article className="topic-info">
                    <article className="topic-info-creation-wrap">
                        <article className="topic-info-category">
                            <span className="category">category/java</span>
                        </article>
                        <article className="topic-info-creation">
                            <span className="topic-info-creation-posted-by">Posted by u/Username</span>
                            <span className="topic-info-creation-date">20.11.2011</span>
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
                            Why is processing a sorted array faster than processing an unsorted array?
                        </h2>
                    </article>
                    <article className="topic-content-img scrollbox">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Java_source2.svg/350px-Java_source2.svg.png" alt="" className="topic-content-img-image" />
                    </article>
                </article>
                <article className="topic-functionality">
                    <ul className="topic-functionality-list">
                        <li className="topic-functionality-list-item">
                            <i class="far fa-heart"></i>
                            <i class="fas fa-heart"></i>
                            <span className="likes-count">78 Likes</span>
                        </li>
                        <li className="topic-functionality-list-item">
                            <i class="fas fa-comments"></i>
                            5 Comments
                        </li>
                        <li className="topic-functionality-list-item">
                            <i class="far fa-bookmark"></i>
                            <i class="fas fa-bookmark"></i>
                            Follow
                        </li>
                    </ul>
                </article>
            </section>
            <section className="topic" onMouseEnter={activeHoverHandler} onMouseLeave={activeHoverHandler}>
                <article className="topic-info">
                    <article className="topic-info-creation-wrap">
                        <article className="topic-info-category">
                            <span className="category">category/java</span>
                        </article>
                        <article className="topic-info-creation">
                            <span className="topic-info-creation-posted-by">Posted by u/Username</span>
                            <span className="topic-info-creation-date">20.11.2011</span>
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
                            Why is processing a sorted array faster than processing an unsorted array?
                        </h2>
                    </article>
                    <article className="topic-content-img scrollbox">
                        <img src="https://wallpaperaccess.com/full/31193.jpg" alt="" className="topic-content-img-image" />
                    </article>
                </article>
                <article className="topic-functionality">
                    <ul className="topic-functionality-list">
                        <li className="topic-functionality-list-item">
                            <i class="far fa-heart"></i>
                            <i class="fas fa-heart"></i>
                            <span className="likes-count">78 Likes</span>
                        </li>
                        <li className="topic-functionality-list-item">
                            <i class="fas fa-comments"></i>
                            5 Comments
                        </li>
                        <li className="topic-functionality-list-item">
                            <i class="far fa-bookmark"></i>
                            <i class="fas fa-bookmark"></i>
                            Save
                        </li>
                    </ul>
                </article>
            </section>
            <section className="topic" onMouseEnter={activeHoverHandler} onMouseLeave={activeHoverHandler}>
                <article className="topic-info">
                    <article className="topic-info-creation-wrap">
                        <article className="topic-info-category">
                            <span className="category">category/java</span>
                        </article>
                        <article className="topic-info-creation">
                            <span className="topic-info-creation-posted-by">Posted by u/Username</span>
                            <span className="topic-info-creation-date">20.11.2011</span>
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
                            Why is processing a sorted array faster than processing an unsorted array?
                        </h2>
                    </article>
                    <article className="topic-content-img scrollbox">
                        <img src="https://images.unsplash.com/photo-1519867997619-e96f4e43aeb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmFycm93JTIwcm9hZHxlbnwwfHwwfHw%3D&w=1000&q=80" alt="" className="topic-content-img-image" />
                    </article>
                </article>
                <article className="topic-functionality">
                    <ul className="topic-functionality-list">
                        <li className="topic-functionality-list-item">
                            <i class="far fa-heart"></i>
                            <i class="fas fa-heart"></i>
                            <span className="likes-count">78 Likes</span>
                        </li>
                        <li className="topic-functionality-list-item">
                            <i class="fas fa-comments"></i>
                            5 Comments
                        </li>
                        <li className="topic-functionality-list-item">
                            <i class="far fa-bookmark"></i>
                            <i class="fas fa-bookmark"></i>
                            Follow
                        </li>
                    </ul>
                </article>
            </section>
        </section>
    )
}