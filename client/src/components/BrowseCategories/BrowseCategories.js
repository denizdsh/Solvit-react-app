import { useCategories } from '../../hooks/useCategories';

import './BrowseCategories.css';
import Grow from '@mui/material/Grow';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNotification } from '../../hooks/useNotification';

export default function BrowseCategories({ fc }) {
    const { show } = useCategories();
    const { showNotification } = useNotification();
    const categories = [
        {
            title: 'JavaScript',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png',
            imgStyles: { background: '#F7E018' }
        },
        {
            title: 'Java',
            img: 'https://camo.githubusercontent.com/537ff5237f38eda1091ba7221dde258733ac6de30a36fbda5be8d3c4364eba1a/68747470733a2f2f63646e2e766f782d63646e2e636f6d2f7468756d626f722f5f416f625a5a44745f525653746b745652376d555a70426b6f76633d2f3078303a363430783432372f31323030783830302f66696c746572733a666f63616c283078303a36343078343237292f63646e2e766f782d63646e2e636f6d2f6173736574732f313038373133372f6a6176615f6c6f676f5f3634302e6a7067',
            imgStyles: { background: 'white' }
        },
        {
            title: 'C#',
            img: 'https://images.ctfassets.net/23aumh6u8s0i/1IKVNqiLhNURzZXp652sEu/4379cfba19f0e19873af6074d3017f70/csharp',
            imgStyles: { background: '#58378D' }
        },
        {
            title: 'Python',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/640px-Python-logo-notext.svg.png',
            imgStyles: { background: '#262B36' }
        },
        {
            title: 'C++',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/640px-ISO_C%2B%2B_Logo.svg.png',
            imgStyles: { background: '#262B36' }
        },
        {
            title: 'PHP',
            img: 'https://prabidhilabs.com/wp-content/uploads/2018/06/php-e8c6425acd65e1cbc012639ad25598c7.png',
            imgStyles: { background: '#262B36' }
        },
        {
            title: 'DevOps',
            img: 'https://www.obsidiantechnologies.io/images/devops.png',
            imgStyles: { background: 'white' }
        },
        {
            title: 'Quality Assurance',
            img: 'https://top.host/blog/wp-content/uploads/2019/09/image-1.png',
            imgStyles: { background: '#5AABB2' }
        },
        {
            title: 'Front-End',
            img: 'https://trio.dev/static/46a74b0f7c9b47353ea207a29731bc51/263a75529a1752b75d64f9f21fd07c92.jpg',
            imgStyles: { background: '#222725' }
        },
        {
            title: 'React',
            img: 'https://reactjs.org/logo-og.png',
            imgStyles: { background: '#222222' }
        },
        {
            title: 'jQuery',
            img: 'https://avatars.githubusercontent.com/u/70142?s=200&v=4',
            imgStyles: { background: '#262B36' }
        },
        {
            title: 'Angular',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png',
            imgStyles: { background: '#262B36' }
        },
        {
            title: 'Vue.js',
            img: 'https://avatars.githubusercontent.com/u/6128107?s=280&v=4',
            imgStyles: { background: '#262B36' }
        },
        {
            title: 'Back-End',
            img: 'https://alterrasoft.com/wp-content/uploads/2019/05/backend-for-article-2.jpg',
            imgStyles: { background: '#2D3E50' }
        },
        {
            title: 'Node.js',
            img: 'https://nodejs.org/static/images/logo.svg',
            imgStyles: { background: '#262B36' }
        },
        {
            title: 'Spring',
            img: 'https://spring.io/images/OG-Spring.png',
            imgStyles: { background: 'white' }
        },
        {
            title: 'ASP.NET',
            img: 'http://static.gunnarpeipman.com/wp-content/uploads/2020/09/aspnet-featured.png',
            imgStyles: { background: 'white' }
        },
        {
            title: 'Django',
            img: 'https://www.djangoproject.com/m/img/logos/django-logo-negative.png',
            imgStyles: { background: '#103E2E' }
        },
        {
            title: 'Other',
            img: 'https://miuc.org/wp-content/uploads/2020/08/6-Reasons-why-you-should-learn-Programming-1280x720.png',
            imgStyles: { background: '#A4CEE7' }
        },
    ]

    function Component(title, img, imgStyles) {
        const [hasFollowed, setHasFollowed] = useState(fc.categories.includes(title.toLocaleLowerCase()));

        const followHandler = async () => {
            await fc.addFollowingCategory(title === 'C#' ? 'csharp' : title === 'Quality Assurance' ? 'qa' : title.toLocaleLowerCase());
            setHasFollowed(true);
            showNotification(`Followed c/${title}`, 'info')
        }
        const unfollowHandler = async () => {
            await fc.removeFollowingCategory(title === 'C#' ? 'csharp' : title === 'Quality Assurance' ? 'qa' : title.toLocaleLowerCase());
            setHasFollowed(false);
            showNotification(`Unfollowed c/${title}`, 'info')
        }
        return (
            <article className="category-card" key={title}>
                <article className="category-card-img" style={imgStyles}>
                    <img src={img} alt={title} />
                </article>
                <article className="category-card-logo">
                    <Avatar
                        sx={{ width: '3.5rem', height: '3.5rem', boxShadow: '0px 0px 7px -3px #86d6f9', border: '4px solid #313846', ...imgStyles }}
                        src={img}
                        alt={title} />
                </article>
                <article className="category-card-title">
                    <p>{title}</p>
                </article>
                <article className="category-card-follow">
                    {hasFollowed
                        ? <Button color="secondary" size="small" className="topic-info-follow-category-btn unfollow-category-btn category-card-follow-btn" onClick={unfollowHandler}>
                            Following
                        </Button>
                        : <Button variant="contained" color="success" size="small" className="topic-info-follow-category-btn category-card-follow-btn" onClick={followHandler}>
                            Follow
                        </Button>}
                </article>
            </article>
        )
    }

    return (
        <Grow
            in={show || true}
            style={{ transformOrigin: '0 0 0' }}
            {...(show ? { timeout: 1000 } : {})}
        >
            <section className="categories">
                {categories.map(c => Component(c.title, c.img, c.imgStyles))}
            </section>
        </Grow>
    )
}