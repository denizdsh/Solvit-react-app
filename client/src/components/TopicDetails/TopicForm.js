import { useNavigate } from 'react-router-dom';

import { isUser } from '../../hoc/isAuth';
import modal from '../../hoc/modal';
import { categories } from '../../services/config';

import './TopicForm.css'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'


function TopicForm({ title, topicAction, topic }) {
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const [title, description, imageUrl, category] = Object.values(Object.fromEntries(form)).map(x => x.trim());
        const urlRegexp = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/ig;
        let err = '';

        if (!title || !description || !category) {
            err = 'All fields required';
        }
        if (title.length > 200) {
            err += '\nTitle must be less than 200 characters';
        }
        if (description.length > 1500) {
            err += '\nDescription must be less than 1500 characters';
        }
        if (!categories.includes(category)) {
            err += '\nCategory must be a valid category';
        }
        if (imageUrl && !imageUrl.match(urlRegexp)) {
            err += '\nImage must be a valid URL';
        }

        if (!err) {
            try {
                const res = await topicAction({ title, description, imageUrl, category: category.toLocaleLowerCase() });
                navigate(`/${res._id}`);
            } catch (err) {
                alert(err.message);
            }
        }
        else alert(err);

        //TODO custom error popup
    }
    const defaultCategory = categories.find(c => c.toLocaleLowerCase() === topic?.category) || false;
    return (
        <>
            <h1 className="topic-form-title">{title}</h1>
            <section className="create-edit-topic" >
                <form method="POST" className="topic-form" onSubmit={onSubmit}>
                    <article>
                        <label className="topic-form-label" htmlFor="topic-title" >Title</label>
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