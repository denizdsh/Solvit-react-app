import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { isUser } from '../../hoc/isAuth';
import modal from '../../hoc/modal';
import { useNotification } from '../../hooks/useNotification';
import { categories } from '../../services/config';

import './TopicForm.css'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'


function TopicForm({ title, topicAction, topic }) {
    const navigate = useNavigate();
    const { showNotification } = useNotification();


    const onSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const [title, description, imageUrl, category] = Object.values(Object.fromEntries(form)).map(x => x.trim());

        const urlRegexp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

        let err = '';
        if (!title || !description || !category) {
            err = 'All fields required.';
        }

        if (title.length > 200) {
            err += '\tTitle must be less than 200 characters.';
        }

        if (description.length > 1500) {
            err += '\tDescription must be less than 1500 characters.';
        }

        if (category && !categories.includes(category)) {
            err += '\tCategory must be a valid category.';
        }

        if (imageUrl && !imageUrl.match(urlRegexp)) {
            err += '\tImage must be a valid URL.';
        }

        if (!err) {
            try {
                const body = { title, description, imageUrl, category: category.toLocaleLowerCase() };

                const params = title === 'Create Topic' ? [body] : [body, topic?._id];
                const res = await topicAction(...params);
                navigate(`/t/${res._id}`, { replace: true });

                showNotification(title === 'Create Topic' ? `Successfully created topic: ${res.title}` : `Successfully edited topic: ${res.title}`, 'success');
            } catch (err) {
                showNotification(err.message, 'error');
            }
        } else showNotification(err, 'error');
    }
    const defaultCategory = categories.find(c => c.toLocaleLowerCase() === topic?.category) || false;
    return (
        <>
            <h1 className="topic-form-title">{title}</h1>
            <section className="create-edit-topic" >
                <form method="POST" className="topic-form" onSubmit={onSubmit}>
                    <article>
                        <label className="topic-form-label" htmlFor="topic-title">Title</label>
                        <input type="text" name="title" id="topic-title" defaultValue={topic?.title} className="topic-form-input" placeholder='Title' />
                    </article>

                    <article>
                        <label className="topic-form-label" htmlFor="topic-description">Description</label>
                        <textarea name="description" id="topic-description" defaultValue={topic?.description} className="topic-form-textarea topic-form-input" placeholder='Description'></textarea>
                    </article>

                    <article>
                        <label className="topic-form-label" htmlFor="topic-imageUrl">Image url</label>
                        <input type="url" name="imageUrl" id="topic-imageUrl" defaultValue={topic?.imageUrl} className="topic-form-input" placeholder='https:// ...' />
                        <a className="link-to-imgur" href="https://imgur.com/upload" target="_blank" rel="noreferrer">You can upload your image here...</a>
                    </article>

                    <section>
                        {
                            defaultCategory &&
                            <Autocomplete className="topic-form-category-autocomplete"
                                disablePortal
                                id="topic-category"
                                options={categories}
                                defaultValue={defaultCategory}
                                sx={{ width: '30%', '&:hover': { outline: '0px', border: '0px', boxShadow: '0px 0px 0px 0px' }, '&.Mui-focused': { outline: '0px', border: '0px', boxShadow: '0px 0px 0px 0px' }, '&.Mui-active': { outline: '0px', border: '0px', boxShadow: '0px 0px 0px 0px' } }}
                                renderInput={(params) => <TextField {...params} label="Category" name="category" />}
                            />


                        }
                        {
                            !defaultCategory &&
                            <Autocomplete className="topic-form-category-autocomplete"
                                disablePortal
                                id="topic-category"
                                options={categories}
                                sx={{ width: '30%', '&:hover': { outline: '0px', border: '0px', boxShadow: '0px 0px 0px 0px' }, '&.Mui-focused': { outline: '0px', border: '0px', boxShadow: '0px 0px 0px 0px' }, '&.Mui-active': { outline: '0px', border: '0px', boxShadow: '0px 0px 0px 0px' } }}
                                renderInput={(params) => <TextField {...params} label="Category" name="category" />}
                            />
                        }


                        <input type="submit" defaultValue="Post" className="topic-form-submit" />
                    </section>
                </form>
            </section>
        </>
    )
}

export default isUser(modal(TopicForm));